import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CountriesMap, CountriesReducerResult, Country, DefaultCountry } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private BASE_URI = 'https://restcountries.com/v2/'

  private countriesSubject = new BehaviorSubject<Country[]>([]);
  countries$: Observable<Country[]> = this.countriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCountries() // happen only once during app cycle
  }

  getCountries() {
    this.http.get<Country[]>(this.BASE_URI + 'all') // HttpClient automatically calls response.json() internally
      .pipe(
        tap(countries => this.countriesSubject.next(countries.map(this.transformCountry))),
        catchError(this.handleError<Country[]>('getCountries', []))
      )
      .subscribe();
  }

  filterCountriesByName(countryName: string): Observable<Country[]>{
    return this.countries$.pipe(
        map(countries => countries.filter( country => {
          return country.name.toLowerCase().includes(countryName.toLowerCase());
        }),
        catchError(this.handleError<Country[]>('filterCountriesByName', []))
      )
    );
  }

  getCountry(countryName: string) {
    return this.http.get<Country[]>(this.BASE_URI + 'name/' + countryName)
      .pipe(
        map(countries => this.transformCountry(countries[0]))
      )
  }

  // UTILITIES
  transformCountry(country: Country) {
    if (country && country.name) {
      return {
        name: country.name,
        capital: country.capital,
        region: country.region,
        population: country.population,
        flag: country.flag
      }
    } else {
      return DefaultCountry
    }

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
