import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.inerface';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { Country } from '../../interfaces/country.interface';


  function validateQueryParam( queryParam: string ): Region {
    queryParam = queryParam.toLocaleLowerCase()

    const validRegions: Record< string , Region > = {
      'africa' : 'Africa',
      'americas': 'Americas',
      'asia': 'Asia',
      'europe': 'Europe',
      'oceania': 'Oceania',
      'antarctic' : 'Antarctic',
    };
    return validRegions[queryParam] ?? 'Americas'
  }



@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

  favoriteService = inject(FavoriteService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';


  //Validar la región 
  selectedRegion = linkedSignal<Region>( () => validateQueryParam(this.queryParams));

  // selectRegion(region : Region) {
  //   this.selectedRegion.set(region);
  // } 

  RegionResource = rxResource({
      request: () => ({ region: this.selectedRegion()  }),
      loader: ({ request }) => {
        if (!request.region) return of([]);

        this.router.navigate(['/country/by-region'], {
          queryParams: {
            region: request.region
          }
        })
  
        // Trasnforma un observable a una promesa - primer resultado.
        return this.countryService.searchByRegion(request.region)  
      }
    })

  toggleFavorite( country : Country){
            this.favoriteService.toggleFavorite(country);
      }
}
