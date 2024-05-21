import { Routes, UrlSegment } from '@angular/router';
import { MainPageComponent } from '@pages/main/main-page.component';
import { homeRouteMatcher } from '@shared/helpers/router.helpers';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        matcher: homeRouteMatcher,
        component: MainPageComponent,
    },
];
