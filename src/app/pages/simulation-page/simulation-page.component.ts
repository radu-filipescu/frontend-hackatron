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

  selectedNode: nodeInternal | null = null;

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
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    ctx.beginPath();

    for(var i = 0; i < this.networkNodes.length; i++) {
      for(var j = 0; j < this.networkNodes.length; j++){
        if(i != j){
          ctx.moveTo(this.getXDraw(this.networkNodes[i].displayX), this.getYDraw(this.networkNodes[i].displayY));
          ctx.lineTo(this.getXDraw(this.networkNodes[j].displayX), this.getYDraw(this.networkNodes[j].displayY));
        }
      }
    }
    
    ctx.stroke();
  }

  dragNodeOffsetX: number = 0;
  dragNodeOffsetY: number = 0;

  dragNodeStart(event: any, node: nodeInternal){
    this.dragNodeOffsetX = event.x - node.displayX - 240;
    this.dragNodeOffsetY = event.y - node.displayY - 112;
  }

  dragNode(event: any, node: nodeInternal){
    event.preventDefault();
    if(event.x == 0 || event.y == 0){
      return;
    }
    node.displayX = event.x - this.dragNodeOffsetX - 240;
    node.displayY = event.y - this.dragNodeOffsetY - 112;
    this.drawConnections();
  }

  backToNetworkView(){
    this.selectedNode = null;
    this.drawConnections();
  }

}
