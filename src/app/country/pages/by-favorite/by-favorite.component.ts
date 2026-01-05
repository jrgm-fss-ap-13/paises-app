import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-by-favorite',
  imports: [CountryListComponent],
  templateUrl: './by-favorite.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByFavoriteComponent {

  favoriteService = inject(FavoriteService);

  
 }
