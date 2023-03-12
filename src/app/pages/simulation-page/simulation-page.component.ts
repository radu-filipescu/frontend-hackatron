import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserPlus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Connection } from 'src/app/shared/DTOs/connection';
import { nodeDTO } from 'src/app/shared/DTOs/NodeDTO';
import { NodesService } from 'src/app/shared/services/nodes.service';
import { nodeInternal } from './classes/nodeInternal';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation-page.component.html',
  styleUrls: ['./simulation-page.component.scss']
})
export class SimulationPageComponent implements OnInit {

  connectionList: Connection[] = [];

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

  refreshing: boolean = false;

  constructor(private nodeService: NodesService) { }

  ngOnInit(): void {
    this.refreshNodes();
  }

  initializeNetwork() {
    this.nodeService.initializeBlockchain().subscribe( () => { console.log('initialized')});
  }

  openAddNodeModal() {
    this.addingNodeModalVisible = true;
    this.newNode = new nodeDTO();
  }

  addUser() {
    //this.addingNodeModalVisible = false;
    let tmp = "";
    if(this.selectedNode)
      tmp = this.selectedNode.name;

      this.refreshing = true;

      this.nodeService.createUser(tmp)
        .subscribe( (data) => {

          this.ngOnInit();
        });
  }

  convertDTOtoNodesInternal(nodes: nodeDTO[]) {
    let result: nodeInternal[] = [];

    var alpha = 0;
    let originX = 770; //origin x and y
    let originY = 400;
    let r = 350;


    for(let i = 0; i < nodes.length; i++) {
      let newNodeInternal = new nodeInternal();

      newNodeInternal.name = nodes[i].name;

      newNodeInternal.displayX = originX + Math.cos(alpha) * r;
      newNodeInternal.displayY = originY + Math.sin(alpha) * r;

      result.push(newNodeInternal);

      alpha += 2 * Math.PI / nodes.length;
    }

    //add mock connections
    this.connectionList.push({
      node1: result[0],
      node2: result[1]
    });
    this.connectionList.push({
      node1: result[1],
      node2: result[2]
    });
    this.connectionList.push({
      node1: result[2],
      node2: result[3]
    });
    this.connectionList.push({
      node1: result[3],
      node2: result[4]
    });

    return result;
  }

  onRightClick(event: any) {
    event.preventDefault();
  }

  updateMiningAllNodes(){
    console.log(this.networkNodes);

    for(let i = 0; i < this.networkNodes.length; i++){
      this.nodeService.checkMiningStatus(this.networkNodes[i].name)
        .subscribe(data => {
          if(this.networkNodes[i])
            this.networkNodes[i].isMining = data;
        });
    }
  }

  getNodes(){
    var nodeList = [
      new nodeDTO(),
      new nodeDTO(),
      new nodeDTO(),
      new nodeDTO(),
      new nodeDTO(),
    ]

    nodeList[0].name = 'privateChain1';
    nodeList[1].name = 'privateChain2';
    nodeList[2].name = 'privateChain3';
    nodeList[3].name = 'privateChain4';
    nodeList[4].name = 'privateChain5';

    return nodeList;
  }

  refreshNodes() {

    this.networkNodes = [];
    this.networkNodes = this.convertDTOtoNodesInternal(this.getNodes());
    setTimeout( () => {
      this.updateMiningAllNodes();
      this.drawConnections();

      this.refreshing = false;
    }, 100);
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

    for(var i = 0; i < this.connectionList.length; i++){
      ctx.moveTo(this.getXDraw(this.connectionList[i].node1.displayX), this.getYDraw(this.connectionList[i].node1.displayY));
      ctx.lineTo(this.getXDraw(this.connectionList[i].node2.displayX), this.getYDraw(this.connectionList[i].node2.displayY));
    }

    ctx.stroke();
  }

  dragNodeOffsetX: number = 0;
  dragNodeOffsetY: number = 0;

  nodeConnection: Connection = {
    node1: new nodeInternal(),
    node2: new nodeInternal()
  }

  connectionStartX: number = 0;
  connectionStartY: number = 0;

  drawSingleConnection(endX: number, endY: number){
    var ctx = this.canvas.nativeElement.getContext('2d');
    if(!ctx) {
      return;
    }
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    ctx.beginPath();

    ctx.moveTo(this.getXDraw(this.connectionStartX), this.getYDraw(this.connectionStartY));
    ctx.lineTo(this.getXDraw(endX), this.getYDraw(endY));

    ctx.stroke();
  }

  dragNodeStart(event: any, node: nodeInternal){
    if(!this.connectingNodes){
      this.dragNodeOffsetX = event.x - node.displayX - 240;
      this.dragNodeOffsetY = event.y - node.displayY - 112;
    } else {
      this.connectionStartX = event.x - 410;
      this.connectionStartY = event.y - 132;
      this.nodeConnection.node1 = node;
    }
    console.log(node);
  }

  dragNodeEnd(event: any, node?: nodeInternal){
    if(!this.connectingNodes){
      return;
    }
    if(node){
      this.nodeConnection.node2 = node;
    }
    for(var i = 0; i < this.networkNodes.length; i++){
      if(event.x - 240 > this.networkNodes[i].displayX && event.x - 240 < this.networkNodes[i].displayX + 62 &&
        event.y - 112 > this.networkNodes[i].displayY && event.y - 112 < this.networkNodes[i].displayY + 61){

        this.nodeConnection.node2 = this.networkNodes[i];
      }
    }

    if(this.nodeConnection.node1 != this.nodeConnection.node2){
      this.connectionList.push(this.nodeConnection);
    }

    this.connectingNodes = false;
    this.drawConnections();
    console.log(this.connectionList)
  }

  dragNode(event: any, node: nodeInternal){
    event.preventDefault();
    if(event.x == 0 || event.y == 0){
      return;
    }
    if(!this.connectingNodes){
      node.displayX = event.x - this.dragNodeOffsetX - 240;
      node.displayY = event.y - this.dragNodeOffsetY - 112;
      this.drawConnections();
    } else {
      this.drawSingleConnection(event.x - 270, event.y - 132);
    }

  }

  backToNetworkView(){
    this.selectedNode = null;
    this.drawConnections();
  }

  showNodeMenu: boolean = false;
  nodeMenuX: number = 0;
  nodeMenuY: number = 0;
  nodeMenuFor: nodeInternal = new nodeInternal;

  openNodeMenu(event: any, node: nodeInternal){
    event.preventDefault();
    this.showNodeMenu = true;
    this.nodeMenuX = event.x - 400;
    this.nodeMenuY = event.y - 120;
    this.nodeMenuFor = node;
    this.showAddNodeMenu = false;
  }

  toggleMining(){
    if(this.nodeMenuFor.isMining){
      this.nodeService.stopMining(this.nodeMenuFor.name)
        .subscribe( ()=> {
          setTimeout(() => {
            this.updateMiningAllNodes();
          }, 300);
        })
    }
    else {
      this.nodeService.startMining(this.nodeMenuFor.name)
        .subscribe( ()=> {
          console.log('started!');
          setTimeout(() => {
            this.updateMiningAllNodes();
          }, 300);
        })
    }
    this.showNodeMenu = false;
  }

  showAddNodeMenu: boolean = false;

  openAddNodeMenu(event: any){
    event.preventDefault();

    this.nodeMenuX = event.x - 400;
    this.nodeMenuY = event.y - 120;

    this.showAddNodeMenu = true;
    this.showNodeMenu = false;
  }

  addNode(){
    let newNodeInternal = new nodeInternal();

    newNodeInternal.name = 'name';
    newNodeInternal.isMining = false;

    newNodeInternal.displayX = this.nodeMenuX;
    newNodeInternal.displayY = this.nodeMenuY;

    this.networkNodes.push(newNodeInternal);
  }

  connectingNodes: boolean = false;

}
