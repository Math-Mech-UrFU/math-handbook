import { ITreeUrlItem } from "@models/http-client/interfaces";

export interface IEnvConfig {
    isProduction: boolean;
    treeUrlList: ITreeUrlItem[];
}