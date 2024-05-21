import { UrlMatchResult, UrlSegment } from "@angular/router";

export function homeRouteMatcher(url: UrlSegment[]): UrlMatchResult | null {
    if (url[0].path !== 'home') {
        return null;
    }
    const consumedUrl: UrlSegment[] = [url[0]];
    for (let i = 1; i < url.length; i++) {
        const segmentList = url[i].path.split('/').map((path) => new UrlSegment(path, {}))
        consumedUrl.push(...segmentList);
    }
    return {consumed: consumedUrl};
}