import { Component, OnInit } from '@angular/core';
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

    for(let i = 0; i < nodes.length; i++) {
      let newNodeInternal = new nodeInternal();

      newNodeInternal.id = nodes[i].id;
      newNodeInternal.name = nodes[i].name;
      newNodeInternal.balance = nodes[i].balance;
      newNodeInternal.password = nodes[i].password;
      newNodeInternal.isMining = nodes[i].isMining = (i == 0) ? true : false;
      newNodeInternal.displayX = (i * 3 + 2) * 100;
      newNodeInternal.displayY = 100;

      result.push(newNodeInternal);
    }

    return result;
  }

  refreshNodes() {
    this.nodeService.getAllNodes()
      .subscribe(nodes => {
        this.networkNodes = this.convertDTOtoNodesInternal(nodes);
      });
  }

  onRightClick(event: any) {
    event.preventDefault();
  }

}
