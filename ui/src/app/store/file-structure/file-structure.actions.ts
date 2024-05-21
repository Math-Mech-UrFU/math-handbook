import { DEFAULT_TREE_LEVEL } from "@models/file-structure/constants";
import { ITreeStructureItem } from "@models/file-structure/interfaces";

export namespace FileStructureActions {
    export class Update {
        static readonly type = '[FileStructure] Update'
        constructor(public readonly treeStructureItem?: ITreeStructureItem, public readonly treeLevel: 1 | 2 = DEFAULT_TREE_LEVEL) {}
    }
}