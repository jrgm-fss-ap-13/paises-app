import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);

  favoriteService = inject(FavoriteService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  
    query = linkedSignal(() => this.queryParams);

  countryResource = rxResource({
      request: () => ({ query: this.query()  }),
      loader: ({ request }) => {
        //of transforma a observable.
        if (!request.query) return of([]);

        this.router.navigate(['/country/by-country'], {
          queryParams: {
            query: request.query
          }
        })
  
        // Trasnforma un observable a una promesa - primer resultado.
        return this.countryService.searchByCountry(request.query)
      }
    })

    toggleFavorite( country : Country){
        this.favoriteService.toggleFavorite(country);
    }

    // countryResource = resource({
    //   request: () => ({ query: this.query()  }),
    //   loader: async({ request }) => {
    //     if (!request.query) return;
  
    //     // Trasnforma un observable a una promesa - primer resultado.
    //     return await firstValueFrom(
    //       this.countryService.searchByCountry(request.query)
    //     )
    //   }
    // })
 }
