import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { NodesService } from 'src/app/shared/services/nodes.service';
import { nodeInternal } from '../classes/nodeInternal';

@Component({
  selector: 'app-network-node',
  templateUrl: './network-node.component.html',
  styleUrls: ['./network-node.component.scss']
})
export class NetworkNodeComponent implements OnInit {
  @Input() networkNode: nodeInternal = new nodeInternal();

  noOfBlocks: number = 0;

  faComputer = faComputer;

  constructor(private nodeService: NodesService) { }

  ngOnInit(): void {
    setInterval( () => {
      this.nodeService.getNumberOfBlocks(this.networkNode.name)
        .subscribe(data => {
          this.noOfBlocks = data;
        });
      }, 1000);
  }
}
