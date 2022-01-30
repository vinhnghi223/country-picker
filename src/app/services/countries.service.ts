import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Country, DefaultCountry } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private BASE_URI = 'https://restcountries.com/v2/'

  // New subscribers get the last published value OR initial value immediately upon subscription.
  private countriesSubject = new BehaviorSubject<Country[]>([]);
  countries$: Observable<Country[]> = this.countriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCountries() // happen only once during app cycle
  }

  getCountries() {
    this.http.get<Country[]>(this.BASE_URI + 'all') // HttpClient automatically calls response.json() internally
      .pipe(
        tap(countries => this.countriesSubject.next(countries.map(this.transformCountry))),
        catchError((err) => of([]))
      )
      .subscribe();
  }

  getCountry(countryName: string) {
    return this.http.get<Country[]>(this.BASE_URI + 'name/' + countryName)
      .pipe(
        map(countries => this.transformCountry(countries[0])),
        catchError((err) => of(DefaultCountry))
      )
  }

  filterCountriesByName(filterdCountryName: string): Observable<Country[]>{
    return this.countries$.pipe(
        map(countries => countries.filter( country => {
          return country.name.toLowerCase().includes(filterdCountryName.toLowerCase());
        }),
        catchError((err) => of([]))
      )
    );
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

}
