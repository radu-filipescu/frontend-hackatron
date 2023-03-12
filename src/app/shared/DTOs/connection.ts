import { nodeInternal } from "src/app/pages/simulation-page/classes/nodeInternal";

export interface Connection {
    node1: nodeInternal;
    node2: nodeInternal;
}