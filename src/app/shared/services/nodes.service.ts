import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalCONSTS } from '../CONSTS';
import { nodeDTO } from '../DTOs/NodeDTO';
import { transferDTO } from '../DTOs/transferDTO';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  nodesAPIUrl: string = globalCONSTS.backendUrl + 'GlobalStatus/';

  constructor(private httpClient: HttpClient) {
  }

  initializeBlockchain() {
    return this.httpClient.post(this.nodesAPIUrl, "");
  }

  createUser(nodeName: string) {
    return this.httpClient.put(this.nodesAPIUrl + "createUser/", {'value': nodeName});
  }

  getUsersFromNode(nodeName: string) {
    return this.httpClient.put<string[]>(this.nodesAPIUrl + "getFromNode", {'value': nodeName});
  }

  setUserToMine(nodeName: string, userIdx: number) {
    return this.httpClient.put(this.nodesAPIUrl + "setUserToMine", {'nodeName': nodeName, 'userIndex': userIdx});
  }

  startMining(nodeName: string) {
    return this.httpClient.put(this.nodesAPIUrl + "startMining", {'value': nodeName});
  }

  stopMining(nodeName: string) {
    return this.httpClient.put(this.nodesAPIUrl + "stopMining", {'value': nodeName});
  }

  balance(nodeName: string, userIdx: number) {
    return this.httpClient.put<number>(this.nodesAPIUrl + "balance", {'nodeName': nodeName, 'userIndex': userIdx});
  }

  transferFunds(input: transferDTO) {
    return this.httpClient.put(this.nodesAPIUrl + 'transfer', input)
  }

  checkMiningStatus(nodeName: string) {
    return this.httpClient.put<boolean>(this.nodesAPIUrl + 'checkMining', {'value': nodeName});
  }
}
