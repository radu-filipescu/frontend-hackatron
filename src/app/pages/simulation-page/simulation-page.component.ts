import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
  cliCommands: string[] = [];

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

    this.nodeService.updateCommands.subscribe(
      data => {
        this.cliCommands.push(data);
      }
    )
  }

  initializeNetwork() {
    this.nodeService.initializeBlockchain().subscribe(
      () => {
        console.log('initialized')
        this.ngOnInit();
      });
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

    return result;
  }

  onRightClick(event: any) {
    event.preventDefault();
  }

  updateMiningAllNodes(){

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

      let nodeFrom = this.networkNodes[this.connectionList[i].node1];
      let nodeTo = this.networkNodes[this.connectionList[i].node2];

      ctx.moveTo(this.getXDraw(nodeFrom.displayX), this.getYDraw(nodeFrom.displayY));
      ctx.lineTo(this.getXDraw(nodeTo.displayX), this.getYDraw(nodeTo.displayY));
    }

    ctx.stroke();
  }

  dragNodeOffsetX: number = 0;
  dragNodeOffsetY: number = 0;

  nodeConnection: Connection = new Connection();

  connectionStartX: number = 0;
  connectionStartY: number = 0;

  drawSingleConnection(endX: number, endY: number){
    var ctx = this.canvas.nativeElement.getContext('2d');
    if(!ctx) {
      return;
    }
    ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    ctx.beginPath();

    for(var i = 0; i < this.connectionList.length; i++){

      let nodeFrom = this.networkNodes[this.connectionList[i].node1];
      let nodeTo = this.networkNodes[this.connectionList[i].node2];

      ctx.moveTo(this.getXDraw(nodeFrom.displayX), this.getYDraw(nodeFrom.displayY));
      ctx.lineTo(this.getXDraw(nodeTo.displayX), this.getYDraw(nodeTo.displayY));
    }

    ctx.moveTo(this.getXDraw(this.connectionStartX), this.getYDraw(this.connectionStartY));
    ctx.lineTo(this.getXDraw(endX), this.getYDraw(endY));

    ctx.stroke();
  }

  dragNodeStart(event: any, node: nodeInternal, idx: number){
    if(!this.connectingNodes){
      this.dragNodeOffsetX = event.x - node.displayX - 240;
      this.dragNodeOffsetY = event.y - node.displayY - 112;
    } else {
      this.connectionStartX = event.x - 410;
      this.connectionStartY = event.y - 132;
      this.nodeConnection.node1 = idx;
    }
  }

  isConnectionNew(connection: Connection): boolean{
    for(let i = 0; i < this.connectionList.length; i++){
      if(connection.node1 == this.connectionList[i].node1 && connection.node2 == this.connectionList[i].node2){
        return false;
      }
    }
    return true;
  }

  dragNodeEnd(event: any, node?: nodeInternal, idx?: number){
    if(!this.connectingNodes){
      return;
    }
    if(this.connectingNodes){
      this.nodeConnection.node2 = idx!;
    }
    for(var i = 0; i < this.networkNodes.length; i++){
      if(event.x - 240 > this.networkNodes[i].displayX && event.x - 240 < this.networkNodes[i].displayX + 62 &&
        event.y - 112 > this.networkNodes[i].displayY && event.y - 112 < this.networkNodes[i].displayY + 61){

        this.nodeConnection.node2 = i;
      }
    }

    if(this.nodeConnection.node1 != this.nodeConnection.node2 && this.isConnectionNew(this.nodeConnection)){
      let c = new Connection();
      c.node1 = this.nodeConnection.node1;
      c.node2 = this.nodeConnection.node2;
      this.connectionList.push(c);

      this.nodeService.connectNodes(this.networkNodes[c.node1].name, this.networkNodes[c.node2].name)
        .subscribe( () => {
          console.log('connected');
        })
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
