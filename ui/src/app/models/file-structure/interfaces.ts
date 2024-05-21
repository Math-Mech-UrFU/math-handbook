import { GitHubTreeStructureItemType } from "./types";

export interface IGitHubTreeStructureItem {
    url: string;
    sha: string;
    type: GitHubTreeStructureItemType;
    encoding: string;
    path: string;
    content?: string;
}

export interface IGitHubTreeStructure {
    tree: IGitHubTreeStructureItem[];
}

export interface ITreeStructureItem extends Partial<IGitHubTreeStructureItem> {
    type: GitHubTreeStructureItemType;
    name: string;
    path: string;
    url: string;
    fullPath: string;
    treeLevel: number;
    isSelected: boolean;
    tree?: ITreeStructureItem[];
}


