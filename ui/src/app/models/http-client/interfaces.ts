import { GitHubTreeStructureItemType } from "./types";

export interface ITreeUrlItem {
    path: string;
    url: string;
    type: GitHubTreeStructureItemType;
}

export interface IGitHubFile {
    sha: string;
    size: number;
    url: string;
    content: string;
    encoding: string;
}

export interface IGitHubTreeStructureItem {
    url: string;
    sha: string;
    type: GitHubTreeStructureItemType;
    encoding: string;
    path: string;
}

export interface ITreeStructureItem extends IGitHubTreeStructureItem {
    tree: ITreeStructureItem[];
}

export interface ITreeStructureRoot {
    type: GitHubTreeStructureItemType;
    path: string;
    tree: ITreeStructureItem[];
    url: string;
}

export interface IGitHubTreeStructure {
    tree: IGitHubTreeStructureItem[];
}
