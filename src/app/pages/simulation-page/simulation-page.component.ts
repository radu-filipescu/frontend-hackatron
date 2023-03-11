import { Component, OnInit } from '@angular/core';
import { faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { nodeDTO } from 'src/app/shared/DTOs/NodeDTO';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation-page.component.html',
  styleUrls: ['./simulation-page.component.scss']
})
export class SimulationPageComponent implements OnInit {

  faUserPlus = faUserPlus;
  faPlus = faPlus;

  networkInitialized: boolean = false;
  addingNodeModalVisible: boolean = true;

  networkNodes: nodeDTO[] = [];

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

  }

}
