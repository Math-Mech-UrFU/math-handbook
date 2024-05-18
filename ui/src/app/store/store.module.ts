import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// TODO: Add configuration file
@NgModule({
    imports: [
        NgxsModule.forRoot([]),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: false,
            maxAge: 5,
        }),
    ],
})
export class StoreModule {}