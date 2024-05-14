import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
    selector: 'math-handbook-menu',
    standalone: true,
    templateUrl: 'menu.component.html',
    styleUrl: 'menu.component.scss',
    imports: [NzMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
    isCollapsed = input(false);
}