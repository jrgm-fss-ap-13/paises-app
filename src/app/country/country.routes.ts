import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { ByFavoriteComponent } from './pages/by-favorite/by-favorite.component';

export const CountryRoutes: Routes = [
    {
        path: '',
        component: CountryLayoutComponent,
        children: [
           {
            path: 'by-capital',
            component: ByCapitalPageComponent
           },
           {
            path: 'by-country',
            component: ByCountryPageComponent
           },
           {
            path: 'by-region',
            component: ByRegionPageComponent
           },
           {
            path: 'by-favorite',
            component: ByFavoriteComponent
           },
           {
            path: 'by/:code',
            component: CountryPageComponent
           },
           {
            path: '**',
            redirectTo: 'by-capital',
           }
        ]
    },
];

export default CountryRoutes;