import { Component, OnInit } from '@angular/core';
import { faUserPlus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { nodeDTO } from 'src/app/shared/DTOs/NodeDTO';
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

  constructor() { }

  ngOnInit(): void {
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

}
