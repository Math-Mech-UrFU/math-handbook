import { Selector } from "@ngxs/store";
import { FileStructureState } from "./file-structure.state";
import { IFileStructureState } from "./file-structure.model";
import { TreeStructure } from "@models/file-structure/types";

export class FileStructureSelectors {
    @Selector([FileStructureState])
    static visibleFileStructure(state: IFileStructureState): TreeStructure {
        return state.visibleStructure;
    }
}