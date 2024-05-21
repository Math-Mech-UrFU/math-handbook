import { GitHubTreeStructureItemType } from "@models/file-structure/types";

export interface ITreeUrlItem {
    path: string;
    fullPath: string;
    name: string;
    url: string;
    treeLevel: number;
    type: GitHubTreeStructureItemType;
}