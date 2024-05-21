import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core";
import { MenuComponent } from "@shared/components/menu/menu.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { ITreeStructureItem } from "@models/file-structure/interfaces";

@Component({
    selector: 'math-handbook-main-page',
    standalone: true,
    templateUrl: 'main-page.component.html',
    styleUrl: 'main-page.component.scss',
    imports: [PdfViewerModule, BreadcrumbComponent, NzLayoutModule, MenuComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    isMenuCollapsed = signal(false);
    file = signal("");

    showFile($event: ITreeStructureItem) {
        this.file.set(`data:application/pdf;${$event.encoding},${$event.content}`)
    }
}