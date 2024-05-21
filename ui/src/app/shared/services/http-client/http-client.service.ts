import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { DEFAULT_TREE_LEVEL } from "@models/file-structure/constants";
import { FileStructureItemTypes } from "@models/file-structure/enums";
import { ITreeStructureItem } from "@models/file-structure/interfaces";
import { TreeStructure } from "@models/file-structure/types";
import { getItemName, mapNameToPath } from "@shared/helpers/file-structure.helpers";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MathHandbookHttpClient {
    constructor(private readonly httpClient: HttpClient) {}

    // TODO: Generic
    // TODO: Refactor
    async getTreeStructure(treeUrlList = environment.treeUrlList, treeLevel: 1 | 2 = DEFAULT_TREE_LEVEL): Promise<TreeStructure> {
        let gitHubTreeStructure: TreeStructure = {};
        for (let i = 0; i < treeUrlList.length; i++) {
            const tree = treeUrlList[i];
            const treeStructure = await firstValueFrom(this.httpClient.get<ITreeStructureItem>(tree.url));
            if (treeLevel === DEFAULT_TREE_LEVEL || !treeStructure.tree) {
                if (tree.type === FileStructureItemTypes.Tree) {
                    gitHubTreeStructure[tree.path] = {
                        path: tree.path,
                        fullPath: tree.fullPath,
                        name: tree.name,
                        type: tree.type,
                        url: tree.url,
                        treeLevel: tree.treeLevel,
                        isSelected: false,
                        tree: [
                            ...(treeStructure.tree || []),
                        ],
                    };
                } else {
                    gitHubTreeStructure[tree.path] = {
                        ...treeStructure,
                        path: tree.path,
                        fullPath: tree.fullPath,
                        treeLevel: tree.treeLevel,
                        name: tree.name,
                        type: tree.type,
                        isSelected: false,
                        url: tree.url,
                    };
                }
                return gitHubTreeStructure;
            }

            // TODO: Create here path
            for (let i = 1; i < treeLevel; i++) {
                for (let j = 0; j < treeStructure.tree.length; j++) {
                    const item = treeStructure.tree[j];
                    const itemName = getItemName(item.path);
                    const itemPath = mapNameToPath(itemName);
                    const subTreeStructure = await this.getTreeStructure([
                        {
                            name: itemName,
                            path: itemPath,
                            fullPath: `${tree.fullPath}/${itemPath}`,
                            type: item.type,
                            treeLevel: tree.treeLevel + 1,
                            url: item.url
                        }
                    ]);
                    treeStructure.tree[j] = subTreeStructure[itemPath];
                }
            }
            gitHubTreeStructure[tree.path] = {
                name: tree.name,
                path: tree.path,
                fullPath: tree.fullPath,
                type: tree.type,
                url: tree.url,
                isSelected: false,
                treeLevel: tree.treeLevel,
                tree: [
                    ...treeStructure.tree,
                ],
            };
        }
        
        return gitHubTreeStructure;
    }
}