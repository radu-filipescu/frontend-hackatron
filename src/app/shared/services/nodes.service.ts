import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { globalCONSTS } from '../CONSTS';
import { connectionDTO } from '../DTOs/connectionDTO';
import { nodeDTO } from '../DTOs/NodeDTO';
import { transferDTO } from '../DTOs/transferDTO';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  nodesAPIUrl: string = globalCONSTS.backendUrl + 'GlobalStatus/';

  updateCommands: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
  }

  initializeBlockchain() {
    this.updateCommands.emit("geth -datadir ./privateChain1 init ./genesis.json");
    this.updateCommands.emit("geth --datadir ./privateChain1 --nodiscover --networkid 1234 --port 30306 --authrpc.port 8552 --rpc.enabledeprecatedpersonal --ipcpath ./privateChain1");

    return this.httpClient.post(this.nodesAPIUrl, "");
  }

  createUser(nodeName: string) {
    this.updateCommands.emit("geth --exec web3.personal.newAccount(**********) attach \\\\.\\pipe\\" + nodeName);

    return this.httpClient.put<{'value': string}>(this.nodesAPIUrl + "createUser/", {'value': nodeName});
  }

  getUsersFromNode(nodeName: string) {
    this.updateCommands.emit("geth --exec eth.accounts attach \\\\.\\pipe\\" + nodeName);

    return this.httpClient.put<string[]>(this.nodesAPIUrl + "getFromNode", {'value': nodeName});
  }

  setUserToMine(nodeName: string, userIdx: number) {
    this.updateCommands.emit("geth --exec miner.setEtherbase(eth.accounts[" + userIdx +"]) attach \\\\.\\pipe\\" + nodeName);

    return this.httpClient.put(this.nodesAPIUrl + "setUserToMine", {'nodeName': nodeName, 'userIndex': userIdx});
  }

  startMining(nodeName: string) {
    this.updateCommands.emit("geth --exec miner.start() attach \\\\.\\pipe\\" + nodeName);

    return this.httpClient.put(this.nodesAPIUrl + "startMining", {'value': nodeName});
  }

  stopMining(nodeName: string) {
    this.updateCommands.emit("geth --exec miner.stop() attach \\\\.\\pipe\\" + nodeName);

    return this.httpClient.put(this.nodesAPIUrl + "stopMining", {'value': nodeName});
  }

  balance(nodeName: string, userIdx: number) {
    return this.httpClient.put<string>(this.nodesAPIUrl + "balance", {'nodeName': nodeName, 'userIndex': userIdx});
  }

  transferFunds(input: transferDTO) {
    this.updateCommands.emit("geth --exec web3.personal.sendTransaction({from:eth.accounts[" + input.senderIdx + "],to:eth.accounts[" + input.senderIdx + "],value:" + input.transferAmount + "},'*******') attach \\\\.\\pipe\\" + input.nodeName);

    return this.httpClient.put(this.nodesAPIUrl + 'transfer', input)
  }

  checkMiningStatus(nodeName: string) {
    return this.httpClient.put<boolean>(this.nodesAPIUrl + 'checkMining', {'value': nodeName});
  }

  getNumberOfBlocks(nodeName: string) {
    return this.httpClient.put<number>(this.nodesAPIUrl + 'blocks', {'value': nodeName});
  }

  connectNodes(nodeName1: string, nodeName2: string){
    let connDTO = new connectionDTO();

    connDTO.node1 = nodeName1;
    connDTO.node2 = nodeName2;

    return this.httpClient.put<string>(this.nodesAPIUrl + 'connect', connDTO);
  }
}
