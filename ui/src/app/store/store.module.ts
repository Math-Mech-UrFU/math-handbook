import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from "@environments/environment";
import { FileStructureState } from "./file-structure/file-structure.state";
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";

// TODO: Add configuration file
@NgModule({
    imports: [
        NgxsModule.forRoot([
            FileStructureState,
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.isProduction,
            maxAge: 5,
        }),
        NgxsRouterPluginModule.forRoot(),
    ],
})
export class StoreModule {}