import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserPlus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { nodeDTO } from 'src/app/shared/DTOs/NodeDTO';
import { NodesService } from 'src/app/shared/services/nodes.service';
import { nodeInternal } from './classes/nodeInternal';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation-page.component.html',
  styleUrls: ['./simulation-page.component.scss']
})
export class SimulationPageComponent implements OnInit {

  faUserPlus = faUserPlus;
  faPlus = faPlus;
  faXmark = faXmark;

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  networkInitialized: boolean = false;
  addingNodeModalVisible: boolean = false;

  networkNodes: nodeInternal[] = [];

  newNode: nodeDTO = new nodeDTO();

  constructor(private nodeService: NodesService) { }

  ngOnInit(): void {
    this.refreshNodes();
  }

  initializeNetwork() {

  }

  openAddNodeModal() {
    this.addingNodeModalVisible = true;
    this.newNode = new nodeDTO();
  }

  addNewNode() {
    //TODO:

    this.addingNodeModalVisible = false;
  }

  convertDTOtoNodesInternal(nodes: nodeDTO[]) {
    let result: nodeInternal[] = [];

    var alpha = 0;
    let originX = 770; //origin x and y
    let originY = 400;
    let r = 350;

    nodes.push(nodes[0])
    nodes.push(nodes[0])
    nodes.push(nodes[0])

    for(let i = 0; i < nodes.length; i++) {
      let newNodeInternal = new nodeInternal();

      newNodeInternal.id = nodes[i].id;
      newNodeInternal.name = nodes[i].name;
      newNodeInternal.balance = nodes[i].balance;
      newNodeInternal.password = nodes[i].password;
      newNodeInternal.isMining = nodes[i].isMining = (i == 0) ? true : false;

      newNodeInternal.displayX = originX + Math.cos(alpha) * r;
      newNodeInternal.displayY = originY + Math.sin(alpha) * r;
      
      result.push(newNodeInternal);

      alpha += 2 * Math.PI / nodes.length;
    }

    return result;
  }

  onRightClick(event: any) {
    event.preventDefault();
  }

  refreshNodes() {
    this.nodeService.getAllNodes()
      .subscribe(nodes => {
        this.networkNodes = this.convertDTOtoNodesInternal(nodes);
        this.drawConnections();
      });
  }

  getXDraw(actualX: number) {
    return Math.ceil(actualX + 20)
  }

  getYDraw(actualY: number) {
    return Math.ceil(actualY + 24)
  }

  drawConnections(){
    var ctx = this.canvas.nativeElement.getContext('2d');
    if(!ctx) {
      return;
    }
    ctx.beginPath();

    for(var i = 0; i < this.networkNodes.length; i++) {
      for(var j = 0; j < this.networkNodes.length; j++){
        if(i != j){
          console.log(this.networkNodes[i], this.networkNodes[j])
          ctx.moveTo(this.getXDraw(this.networkNodes[i].displayX), this.getYDraw(this.networkNodes[i].displayY));
          ctx.lineTo(this.getXDraw(this.networkNodes[j].displayX), this.getYDraw(this.networkNodes[j].displayY));
        }
      }
    }
    
    ctx.stroke();
  }

}
