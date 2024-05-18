import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DEFAULT_TREE_URL_PATH, TREE_LEVEL, TREE_URL_LIST } from "@models/http-client/constants";
import { IGitHubFile, ITreeStructureItem } from "@models/http-client/interfaces";
import { TreeStructure } from "@models/http-client/types";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MathHandbookHttpClient {
    constructor(private readonly httpClient: HttpClient) {}

    // TODO: Generic
    async getTreeStructure(treeUrlList = TREE_URL_LIST, treeLevel: 1 | 2 = TREE_LEVEL): Promise<TreeStructure> {
        let gitHubTreeStructure: TreeStructure = {};
        for (let i = 0; i < treeUrlList.length; i++) {
            const tree = treeUrlList[i];
            const treeStructure = await firstValueFrom(this.httpClient.get<ITreeStructureItem>(tree.url));
            if (treeLevel === TREE_LEVEL || !treeStructure.tree) {
                gitHubTreeStructure[tree.path] = {
                    path: tree.path,
                    type: tree.type,
                    url: tree.url,
                    tree: [
                        ...(treeStructure.tree || []),
                    ],
                };
                continue;
            }
            for (let i = 0; i < treeLevel; i++) {
                for (let j = 0; j < treeStructure.tree.length; j++) {
                    const item = treeStructure.tree[j];
                    const subTreeStructure = await this.getTreeStructure([{
                        path: DEFAULT_TREE_URL_PATH,
                        type: item.type,
                        url: item.url
                    }]);
                    item.tree = subTreeStructure[DEFAULT_TREE_URL_PATH].tree;
                }
            }
            gitHubTreeStructure[tree.path] = {
                path: tree.path,
                type: tree.type,
                url: tree.url,
                tree: [
                    ...treeStructure.tree,
                ],
            };
        }
        
        return gitHubTreeStructure;
    }

    async getFile(url: string): Promise<IGitHubFile> {
        const file = await firstValueFrom(this.httpClient.get<IGitHubFile>(url));
        return file;
    }
}