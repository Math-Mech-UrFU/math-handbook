import { IEnvConfig } from "@models/environment/interfaces";
import { FileStructureItemTypes } from "@models/file-structure/enums";
import { mapNameToPath } from "@shared/helpers/file-structure.helpers";

export const environment: IEnvConfig = {
    isProduction: false,
    treeUrlList: [
        // {
        //     name: 'Мат анализ',
        //     path: mapNameToPath('Мат анализ'),
        //     fullPath: mapNameToPath('Мат анализ'),
        //     type: FileStructureItemTypes.Tree,
        //     treeLevel: 0,
        //     url: 'https://api.github.com/repos/Math-Mech-UrFU/math-analysation/git/trees/main',
        // },
        // {
        //     name: 'Алгебра и геометрия',
        //     path: mapNameToPath('Алгебра и геометрия'),
        //     fullPath: mapNameToPath('Алгебра и геометрия'),
        //     type: FileStructureItemTypes.Tree,
        //     treeLevel: 0,
        //     url: 'https://api.github.com/repos/Math-Mech-UrFU/algebra-and-geometry/git/trees/main',
        // },
        {
            name: 'test-repo',
            path: mapNameToPath('test-repo'),
            fullPath: mapNameToPath('test-repo'),
            type: FileStructureItemTypes.Tree,
            treeLevel: 0,
            url: 'https://api.github.com/repos/mockoon/mockoon/git/trees/main',
        }
    ],
}