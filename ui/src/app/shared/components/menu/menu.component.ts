import { ChangeDetectionStrategy, ChangeDetectorRef, Component, input, output } from "@angular/core";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterLink } from "@angular/router";
import { ITreeStructureItem } from "@models/file-structure/interfaces";
import { Store } from "@ngxs/store";
import { FileStructureSelectors } from "@store/file-structure/file-structure.selectors";
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
    selector: 'math-handbook-menu',
    standalone: true,
    templateUrl: 'menu.component.html',
    styleUrl: 'menu.component.scss',
    imports: [RouterLink, NzToolTipModule, NzIconModule, NzMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
    isCollapsed = input(false);

    selectFileChange = output<ITreeStructureItem>();

    treeStructure = toSignal(this.store.select(FileStructureSelectors.visibleFileStructure).pipe(
        switchMap((fileStructure) => {
            return of(Object.values(fileStructure));
        }))
    );

    constructor(private readonly store: Store, private readonly cdr: ChangeDetectorRef) {}

    // ngOnInit() {
    //     this.treeStructure.
    // }

    trackMenuItem(item: ITreeStructureItem): string {
        return `${item.sha || item.path}${item.isSelected}`
    }

    async selectFile($event: ITreeStructureItem) {
        this.selectFileChange.emit($event);
    }
}