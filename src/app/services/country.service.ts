import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASE_URI, DEFAULT_COUNTRY } from '../common/constants';
import { Country } from '../common/model';
import { transformCountry } from '../common/utils';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountry(countryName: string) {
    return this.http.get<Country[]>(BASE_URI + 'name/' + countryName)
      .pipe(
        map(countries => transformCountry(countries[0])),
        catchError((err) => of(DEFAULT_COUNTRY))
      )
  }

}
