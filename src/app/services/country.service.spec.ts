import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { DEFAULT_COUNTRY } from '../common/constants';
import { Country } from '../common/model';

import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of([]));
    service = new CountryService(httpClientSpy);
  });

  describe('getCountry', () => {

    it('should return an expected country', (done: DoneFn) => {
      const expectedCountries: Country[] = [{
        name: 'Australia',
        capital: 'Canberra',
        region: 'Oceania',
        population: 25687041,
        flag: ''
      }];
      httpClientSpy.get.and.returnValue(of(expectedCountries));

      service.getCountry('Australia').subscribe({
        next: country => {
          expect(country)
            .withContext('expected country')
            .toEqual(expectedCountries[0]);
          done();
        },
        error: done.fail
      });

    }); // end of test case

    it('should return a DEFAULT_COUNTRY if no country found or on error', (done: DoneFn) => {

      httpClientSpy.get.and.returnValue(of({ status: 404, message: 'Not Found' }));

      service.getCountry('Helsinki').subscribe({
        next: country => {
          expect(country)
            .toEqual(DEFAULT_COUNTRY);
          done();
        },
        error: done.fail
      });

    }); // end of test case

  });

});
