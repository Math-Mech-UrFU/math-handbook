import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core";
import { MenuComponent } from "@shared/components/menu/menu.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
    selector: 'math-handbook-main-page',
    standalone: true,
    templateUrl: 'main-page.component.html',
    styleUrl: 'main-page.component.scss',
    imports: [NzBreadCrumbModule, NzLayoutModule, MenuComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    isMenuCollapsed = signal(false);
}