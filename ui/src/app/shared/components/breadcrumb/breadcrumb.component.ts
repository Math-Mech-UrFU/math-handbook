import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";

@Component({
    selector: 'math-handbook-breadcrumb',
    standalone: true,
    templateUrl: 'breadcrumb.component.html',
    imports: [NzBreadCrumbModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {}