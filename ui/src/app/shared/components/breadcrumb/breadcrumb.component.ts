import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { ITreeStructureItem } from "@models/file-structure/interfaces";
import { RouterState } from "@ngxs/router-plugin";
import { Store } from "@ngxs/store";
import { FileStructureSelectors } from "@store/file-structure/file-structure.selectors";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { of, switchMap, tap } from "rxjs";

@Component({
    selector: 'math-handbook-breadcrumb',
    standalone: true,
    templateUrl: 'breadcrumb.component.html',
    imports: [NzBreadCrumbModule, RouterLink, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
    url = toSignal(this.store.select(FileStructureSelectors.visibleFileStructure).pipe(
        switchMap(() => {
            const storeSnapshot = this.store.snapshot();
            const urlSegmentList = storeSnapshot.router.state.url.split('/').filter((value: string) => value);
            urlSegmentList.splice(0, 1);
            let currentItem: ITreeStructureItem | undefined = storeSnapshot.fileSystem.structure[urlSegmentList[0]];
            if (!currentItem) {
                return of([]);
            }
            let result: ITreeStructureItem[] = [currentItem];
            for (let i = 1; i < urlSegmentList.length; i++) {
                if (!currentItem.tree) {
                    return of(result);
                }
                for (let j = 0; j < currentItem.tree.length; j++) {
                    if (currentItem.tree[j].path === urlSegmentList[i]) {
                        result.push(currentItem.tree[j]);
                        currentItem = currentItem.tree[j];
                        break;
                    }
                }
            }
            return of(result);
        })
    ), {initialValue: []});

    constructor(private readonly store: Store) {}
}