import { Component, Input, OnInit } from '@angular/core';
import { NodesService } from 'src/app/shared/services/nodes.service';
import { nodeInternal } from '../classes/nodeInternal';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.scss']
})
export class NodeViewComponent implements OnInit {

  @Input()
  node: nodeInternal = new nodeInternal();

  constructor(private nodeService: NodesService) { }

  ngOnInit(): void {
  }

}
