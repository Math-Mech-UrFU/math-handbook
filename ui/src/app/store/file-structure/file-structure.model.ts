import { TreeStructure } from "@models/file-structure/types";

export interface IFileStructureState {
    structure: TreeStructure;
    visibleStructure: TreeStructure;
}