import { ITreeStructureRoot } from "./interfaces";

export type GitHubTreeStructureItemType = 'blob' | 'tree';

export type TreeStructure = Record<string, ITreeStructureRoot>