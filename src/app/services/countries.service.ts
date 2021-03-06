import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BASE_URI } from '../common/constants';
import { Country } from '../common/model';
import { transformCountry } from '../common/utils';

@Injectable()
export class CountriesService {

  // new subscribers get the last published value OR initial value immediately upon subscription.
  private countriesSubject = new BehaviorSubject<Country[]>([]);
  countries$: Observable<Country[]> = this.countriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCountries() // happen only once during app cycle
  }

  getCountries() {
    this.http.get<Country[]>(BASE_URI + 'all') // HttpClient automatically calls response.json() internally
      .pipe(
        tap(countries => this.countriesSubject.next(countries.map(transformCountry))),
        catchError((err) => of([]))
      )
      .subscribe();
  }

  filterCountriesByName(filterdCountryName: string): Observable<Country[]> {
    return this.countries$.pipe(
      map(countries => countries.filter(country => {
        return country.name.toLowerCase().includes(filterdCountryName.toLowerCase());
      }),
        catchError((err) => of([]))
      )
    );
  }

}
