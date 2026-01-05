import { Component, inject, linkedSignal, OnDestroy, OnInit, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit{

  countryService = inject(CountryService);

  favoriteService = inject(FavoriteService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams);

  ngOnInit(): void {
    console.log('componente inicializado')
  }
  
  capitalResource = rxResource({
    request: () => ({ query: this.query()  }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      })

      // Trasnforma un observable a una promesa - primer resultado.
      return this.countryService.searchByCapital(request.query)
    }
  })

  toggleFavorite( country : Country){
    this.favoriteService.toggleFavorite(country);
  }




   //abortSignal = es utilizado para cancelar la petición
  //  countryResource = resource({
  //   request: () => ({ query: this.query()  }),
  //   loader: async({ request }) => {
  //     if (!request.query) return;

  //     // Trasnforma un observable a una promesa - primer resultado.
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     )
  //   }
  // })



  // isLoading = signal(false);
  // hasError = signal<string|null>(null)
  // countries = signal<Country[]>([]);
  
  // onSearch(query: string){
  //   if( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   return this.countryService.searchByCapital(query)
  //   .subscribe(
  //     {
  //       next: (countriesResp) => {
  //           this.isLoading.set(false);
  //           this.countries.set(countriesResp);
  //       },
  //       error:(err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.hasError.set(err);
  //       },       
  //     }
  //   )
  // }
  
}


