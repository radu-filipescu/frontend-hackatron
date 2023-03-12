import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NodesService } from 'src/app/shared/services/nodes.service';
import { nodeInternal } from '../classes/nodeInternal';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { userDTO } from 'src/app/shared/DTOs/user';
import { transferDTO } from 'src/app/shared/DTOs/transferDTO';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss']
})
export class NodeViewComponent implements OnInit {

  faComputer = faComputer;

  @Input()
  node: nodeInternal = new nodeInternal();

  nodeUsers: userDTO[] = [];
  loadedUsersCount: number = 0;

  @ViewChild('usersCanvas') usersCanvas!: ElementRef<HTMLCanvasElement>;

  transactioning: boolean = false;
  transferDTO: transferDTO = new transferDTO();

  sumModalVisible: boolean = false;

  constructor(private nodeService: NodesService) { }

  ngOnInit(): void {
    this.loadedUsersCount = 0;

    this.nodeService.getUsersFromNode(this.node.name)
      .subscribe(data2 => {
          this.nodeUsers = [];
          for(let i = 0; i < data2.length; i++) {
            let newUser = new userDTO();

            newUser.name = data2[i];
            newUser.idx = i;
            this.nodeService.balance(this.node.name, newUser.idx)
              .subscribe(data => {
                newUser.balance = data;
                this.nodeUsers.push(newUser);

                this.loadedUsersCount += 1;

                if(this.loadedUsersCount == data2.length)
                  this.computeAngles();
              })
          }
        }
      )
  }

  getXDraw(actualX: number) {
    return Math.ceil(actualX + 20)
  }

  getYDraw(actualY: number) {
    return Math.ceil(actualY + 24)
  }

  drawConnections(){
    var ctx = this.usersCanvas.nativeElement.getContext('2d');
    if(!ctx) {
      return;
    }
    ctx.clearRect(0, 0, this.usersCanvas.nativeElement.width, this.usersCanvas.nativeElement.height);
    ctx.beginPath();

    ctx.moveTo(this.getXDraw(500), this.getYDraw(900));

    for(var i = 0; i < this.nodeUsers.length; i++){
      ctx.lineTo(this.getXDraw(this.nodeUsers[i].displayX), this.getYDraw(this.nodeUsers[i].displayY));
    }

    ctx.stroke();
  }

  computeAngles() {
    let alpha = 0;
    let originX = 670; //origin x and y
    let originY = 400;
    let r = 350;

    for(let i = 0; i < this.nodeUsers.length; i++) {
      this.nodeUsers[i].displayX = originX + Math.cos(alpha) * r;
      this.nodeUsers[i].displayY = originY + Math.sin(alpha) * r;

      this.nodeUsers[i].displayX = Math.round(this.nodeUsers[i].displayX);
      this.nodeUsers[i].displayY = Math.round(this.nodeUsers[i].displayY);

      alpha += 2 * Math.PI / this.nodeUsers.length;

      setInterval( () => {
        this.nodeService.balance(this.node.name, this.nodeUsers[i].idx)
          .subscribe( data => {
            this.nodeUsers[i].balance = data;
          })
      }, 1500);
    }
  }

  userMenuX: number = 0;
  userMenuY: number = 0;
  showUserMenu: boolean = false;
  selectedUser: userDTO = new userDTO();

  openUserMenu(event: any, user: userDTO){
    event.preventDefault();

    this.userMenuX = event.x - 400;
    this.userMenuY = event.y - 120;

    this.showUserMenu = true;
    this.selectedUser = user;
  }

  transactionModal(){

  }

  setMiningUser(){
    this.nodeService.setUserToMine(this.node.name, this.selectedUser.idx).subscribe(
      () => {console.log("mining")}
    )
  }

  clickOnUser(clickedUser: userDTO) {
    if(!this.transactioning)
      return;

    this.transferDTO = new transferDTO();

    this.transferDTO.nodeName = this.node.name;
    this.transferDTO.receiverIdx = clickedUser.idx;
    this.transferDTO.senderIdx = this.selectedUser.idx;

    this.sumModalVisible = true;
  }

  sendTransfer() {
    console.log(this.transferDTO);

    this.nodeService.transferFunds(this.transferDTO)
      .subscribe( () => {
        console.log('transfer made');
      });


    this.sumModalVisible = false;
    this.transferDTO = new transferDTO();
  }

}
