import { Component, inject, input, output } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe,RouterLink,FavoriteButtonComponent],
  templateUrl: './country-list.component.html',

})
export class CountryListComponent { 

  favoriteService = inject(FavoriteService)
  
  countries = input.required<Country[]>();

  errorMessage = input<string | unknown | null >();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  toggleFavorite = output<Country>();
}
