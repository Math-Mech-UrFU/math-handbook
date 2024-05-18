import { ChangeDetectionStrategy, Component, input, output, signal } from "@angular/core";
import { MathHandbookHttpClient } from "@shared/services/http-client/http-client.service";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IGitHubFile, ITreeStructureItem, ITreeStructureRoot } from "@models/http-client/interfaces";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DEFAULT_TREE_URL_PATH, TREE_URL_LIST } from "@models/http-client/constants";

@Component({
    selector: 'math-handbook-menu',
    standalone: true,
    templateUrl: 'menu.component.html',
    styleUrl: 'menu.component.scss',
    imports: [NzToolTipModule, NzIconModule, NzMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
    isCollapsed = input(false);

    selectFileChange = output<IGitHubFile>();

    treeStructure = signal<ITreeStructureRoot[]>([]);

    constructor(private readonly mathHandbookHttpClient: MathHandbookHttpClient) {}

    ngOnInit() {
        this.updateTreeStructure();
    }

    async selectFile($event: ITreeStructureItem | ITreeStructureRoot) {
        const file = await this.mathHandbookHttpClient.getFile($event.url);
        this.selectFileChange.emit(file);
    }

    async updateTreeStructure(treeStructureItem?: ITreeStructureItem) {
        if (!treeStructureItem) {
            const treeStructure = await this.mathHandbookHttpClient.getTreeStructure(TREE_URL_LIST, 2);
            this.treeStructure.set(Object.values(treeStructure));
            return;
        }
        const treeStructure = await this.mathHandbookHttpClient.getTreeStructure([{
            path: DEFAULT_TREE_URL_PATH,
            type: treeStructureItem.type,
            url: treeStructureItem.url
        }], 2);
        this.treeStructure.set(Object.values(treeStructure));
    }
}