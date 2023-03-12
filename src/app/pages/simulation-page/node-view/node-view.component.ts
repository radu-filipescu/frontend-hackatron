import { Component, Input, OnInit } from '@angular/core';
import { NodesService } from 'src/app/shared/services/nodes.service';
import { nodeInternal } from '../classes/nodeInternal';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { userDTO } from 'src/app/shared/DTOs/user';

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

      console.log(this.nodeUsers[i]);

      alpha += 2 * Math.PI / this.nodeUsers.length;

      setInterval( () => {
        this.nodeService.balance(this.node.name, this.nodeUsers[i].idx)
          .subscribe( data => {
            this.nodeUsers[i].balance = data;
          })
      }, 1500);
    }
  }

  openUserMenu(event: any, user: userDTO){

  }

}
