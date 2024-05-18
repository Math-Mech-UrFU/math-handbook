import { ITreeUrlItem } from "./interfaces";

export const TREE_LEVEL = 1;

export const DEFAULT_TREE_URL_PATH = 'default-path';

export const TREE_URL_LIST: ITreeUrlItem[] = [
    {
        path: 'Мат анализ',
        type: 'tree',
        url: 'https://api.github.com/repos/Math-Mech-UrFU/math-analysation/git/trees/main',
    },
    {
        path: 'Алгебра и геометрия',
        type: 'tree',
        url: 'https://api.github.com/repos/Math-Mech-UrFU/algebra-and-geometry/git/trees/main',
    },
];