import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { MathHandbookHttpClient } from "@shared/services/http-client/http-client.service";
import { environment } from "@environments/environment";
import { FileStructureItemTypes } from "@models/file-structure/enums";
import { IFileStructureState } from "./file-structure.model";
import { RouterNavigated } from "@ngxs/router-plugin";
import { ITreeStructureItem } from "@models/file-structure/interfaces";
import { DEFAULT_TREE_LEVEL } from "@models/file-structure/constants";

// TODO: handle situation when app started and
// we at the beginning put a very long url
@State<IFileStructureState>({
    name: 'fileSystem',
    defaults: {
        structure: {},
        visibleStructure: {},
    }
})
@Injectable()
export class FileStructureState {
    constructor(private readonly store: Store, private readonly mathHandbookHttpClient: MathHandbookHttpClient) {}

    // TODO: refactor
    async update(fileSystem: IFileStructureState, treeStructureItem?: ITreeStructureItem, treeLevel: 1 | 2 = DEFAULT_TREE_LEVEL) {
        if (!treeStructureItem) {
            const treeStructure = await this.mathHandbookHttpClient.getTreeStructure(environment.treeUrlList, treeLevel);
            return {
                structure: treeStructure,
                visibleStructure: treeStructure,
            };
        }
        if (treeStructureItem.type === FileStructureItemTypes.Blob) {
            const fullPathList = treeStructureItem.fullPath.split('/');
            const visibleStructure = fileSystem.visibleStructure;
            const currentItem = visibleStructure[fullPathList[fullPathList.length - 2]];
            currentItem.isSelected = treeStructureItem.isSelected;
            if (!currentItem.tree) {
                return fileSystem;
            }
            for (let i = 0; i < currentItem.tree.length; i++) {
                if (currentItem.tree[i].path === treeStructureItem.path) {
                    currentItem.tree[i].isSelected = treeStructureItem.isSelected;
                    break;
                }
            }
            return {...fileSystem};
        }
        const treeStructure = await this.mathHandbookHttpClient.getTreeStructure(
            [
                {
                    name: treeStructureItem.name,
                    path: treeStructureItem.path,
                    fullPath: treeStructureItem.fullPath,
                    treeLevel: treeStructureItem.treeLevel,
                    type: treeStructureItem.type,
                    url: treeStructureItem.url,
                }
            ],
            treeLevel
        );
        treeStructure[treeStructureItem.path].isSelected = treeStructureItem.isSelected;
        const fileStructure = fileSystem.structure;
        const pathList = treeStructureItem.fullPath.split('/');
        let currentItem = fileStructure[pathList[0]];
        if (!currentItem) {
            return fileSystem;
        }
        for (let i = 1; i < pathList.length; i++) {
            if (!currentItem.tree) {
                break;
            }
            for (let j = 0; j < currentItem.tree.length; j++) {
                if (currentItem.tree[j].path === pathList[i]) {
                    if (i === pathList.length - 1) {
                        currentItem.tree[j] = treeStructure[treeStructureItem.name];
                        break;
                    }
                    currentItem = currentItem.tree[j];
                    break;
                }
            }
        }
        return {
            structure: fileStructure,
            visibleStructure: treeStructure,
        };
    }

    // TODO: Change when getTreeStructure will be generic with treeLevel
    // TODO: Check do we delete tree when go back
    // TODO: Handle return home
    @Action(RouterNavigated)
    async updateOnUrlChange({ setState, getState }: StateContext<IFileStructureState>, { routerState }: RouterNavigated) {
        const urlSegmentList = routerState.url.split('/');
        urlSegmentList.splice(0, 2);
        let fileSystem = getState();
        if (Object.keys(fileSystem.structure).length === 0 || urlSegmentList.length === 0) {
            fileSystem = await this.update(fileSystem, undefined, 2);
            let currentItem = fileSystem.structure[urlSegmentList[0]];
            if (!currentItem) {
                setState(fileSystem);
                return;
            }
            for (let i = 0; i < urlSegmentList.length; i++) {
                if (!currentItem.tree) {
                    break;
                }
                for (let j = 0; j < currentItem.tree.length; j++) {
                    if (currentItem.tree[j].path === urlSegmentList[i]) {
                        currentItem = currentItem.tree[j];
                        break;
                    }
                }
                fileSystem = await this.update(fileSystem, {
                    ...currentItem,
                    isSelected: i === urlSegmentList.length - 1 ? true : false,
                }, 2);
                currentItem = fileSystem.visibleStructure[currentItem.path];
            }
            setState(fileSystem);
            return;
        }
        fileSystem = getState();
        let currentItem = fileSystem.structure[urlSegmentList[0]];
        if (!currentItem) {
            return;
        }
        for (let i = 0; i < urlSegmentList.length; i++) {
            if (!currentItem.tree) {
                break;
            }
            for (let j = 0; j < currentItem.tree.length; j++) {
                if (currentItem.tree[j].path === urlSegmentList[i]) {
                    currentItem = currentItem.tree[j];
                    break;
                }
            }
            fileSystem = await this.update(fileSystem, {
                ...currentItem,
                isSelected: i === urlSegmentList.length - 1 ? true : false,
            }, 2);
            currentItem = fileSystem.visibleStructure[currentItem.path];
        }
        setState(fileSystem);
    }
}
