import { NAME_TO_PATH } from "@models/file-structure/constants";

export function mapNameToPath(name: string): string {
    return NAME_TO_PATH[name] || name;
}

export function getItemName(path: string): string {
    let lastIndex = path.lastIndexOf('.');
    lastIndex = lastIndex === -1 ? path.length : lastIndex;
    return path.slice(0, lastIndex);
}
