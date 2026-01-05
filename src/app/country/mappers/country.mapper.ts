import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";


export class CountryMapper {

    static mapRestCountryToCountry( item : RESTCountry  ): Country {

        return {

            cca2 : item.cca2,
            flag: item.flag,
            flagSvg: item.flags.svg,
            name: item.translations['spa'].common ?? 'No Spanish Name',
            capital: item.capital?.join(','),
            population: item.population,
            region: item.region,
            subRegion: item.subregion
        }

    }
    
    static mapRestCountryArrayToCountryArray(  items: RESTCountry[] ): Country[] {

       return items.map(this.mapRestCountryToCountry);
    }


}