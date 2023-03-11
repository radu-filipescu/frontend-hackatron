import { Component, Input, OnInit } from '@angular/core';
import { nodeInternal } from '../classes/nodeInternal';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss']
})
export class NodeViewComponent implements OnInit {

  @Input()
  node: nodeInternal = new nodeInternal();

  constructor() { }

  ngOnInit(): void {
  }

}
