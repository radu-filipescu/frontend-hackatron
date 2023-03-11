import { Component, Input, OnInit } from '@angular/core';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { nodeInternal } from '../classes/nodeInternal';

@Component({
  selector: 'app-network-node',
  templateUrl: './network-node.component.html',
  styleUrls: ['./network-node.component.scss']
})
export class NetworkNodeComponent implements OnInit {
  @Input() networkNode: nodeInternal = new nodeInternal();

  faComputer = faComputer;

  constructor() { }

  ngOnInit(): void {
  }

}
