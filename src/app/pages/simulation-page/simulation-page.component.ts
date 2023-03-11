import { Component, OnInit } from '@angular/core';
import { faU, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation-page.component.html',
  styleUrls: ['./simulation-page.component.scss']
})
export class SimulationPageComponent implements OnInit {

  faUserPlus = faUserPlus;

  networkInitialised: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  initializeNetwork() {

  }

}
