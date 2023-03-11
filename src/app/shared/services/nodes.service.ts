import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalCONSTS } from '../CONSTS';
import { nodeDTO } from '../DTOs/NodeDTO';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  nodesAPIUrl: string = globalCONSTS.backendUrl + 'Nodes/';

  constructor(private httpClient: HttpClient) {

  }

  getAllNodes() {
    return this.httpClient.get<nodeDTO[]>(this.nodesAPIUrl);
  }
}
