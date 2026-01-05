import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root'
})

export class CountryService {

    private http = inject(HttpClient);
    private queryCacheCapital = new Map<string, Country[]>();
    private queryCacheCountry = new Map<string, Country[]>();
    private queryCacheRegion = new Map<string, Country[]>();


    searchByCapital( query: string ): Observable<Country[]>{
        query = query.toLowerCase();

        if ( this.queryCacheCapital.has(query)){
            return of( this.queryCacheCapital.get(query) ?? []);
        }

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
            .pipe(
                map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
                tap( countries => this.queryCacheCapital.set(query, countries)),
                catchError( error => {
                    console.log(error)

                    return throwError( () => new Error (`No sé encontró capitales con el nombre de : ${query}`) );
                })
            )
    }

    searchByCountry(query: string):Observable<Country[]>{
        query = query.toLowerCase();

        if ( this.queryCacheCountry.has(query)){
            return of( this.queryCacheCountry.get(query) ?? [])
        }
        console.log('llegando al servidor');

        return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
            .pipe(
                map( restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
                tap( country => this.queryCacheCountry.set(query, country)),
                catchError( error => {
                    console.log(error)
                    return throwError( () => new Error (`No sé encontraró pais con el nombre de : ${query}`) );
            })
        )
    }

    searchByAlphaCode(code: string){

        return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
            .pipe(
                map( restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
                map( countries => countries.at(0)),
                catchError( error => {
                    console.log(error)
                    return throwError( () => new Error (`No sé encontraró pais con el código de : ${code}`) );
            })
        )
    }

    searchByRegion(region : string){

        if ( this.queryCacheRegion.has(region)){
            return of( this.queryCacheRegion.get(region) ?? []).pipe(
                delay(2000)
            )
        }

        return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
            .pipe(
                map( restCountryForRegion => CountryMapper.mapRestCountryArrayToCountryArray(restCountryForRegion)),
                tap( countriesForRegion => this.queryCacheRegion.set(region, countriesForRegion)),
                catchError( error => {
                    console.log(error)
                    return throwError( () => new Error (`No sé encontraró pais con el nombre de : ${region}`) );
            })
        )
    }
}