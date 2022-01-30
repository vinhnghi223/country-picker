import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { DEFAULT_COUNTRY } from '../common/constants';
import { Country } from '../common/model';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const createMockCountry = (countryName: string) => {
    return {  ...DEFAULT_COUNTRY, name: countryName}
  }
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of([]));
    service = new CountriesService(httpClientSpy);
  });

  describe('getCountries', () => {
    let mockedCountries: Country[];
    beforeEach(() => {
      mockedCountries = [
        createMockCountry('Australia'),
        createMockCountry('Austria'),
        createMockCountry('Saudi')
      ]
      httpClientSpy.get.and.returnValue(of(mockedCountries));
    })

    it('should get and make all countries available via countries$ observable', (done: DoneFn) => {
      service.getCountries()
      service.countries$.subscribe({
        next: countries => {
          expect(countries)
            .toEqual(mockedCountries);
          done();
        },
        error: done.fail
      })
    }); // end of test case

  });

  describe('filterCountriesByName', () => {

    beforeEach(() => {
      const mockedCountries: Country[] = [
        createMockCountry('Australia'),
        createMockCountry('Austria'),
        createMockCountry('Saudi')
      ]
      service.countries$ = of(mockedCountries)
    })

    it('should return a list of filted countries by filter text', (done: DoneFn) => {
      service.filterCountriesByName('Aus').subscribe({
        next: countries => {
          expect(countries)
            .toEqual(
              [
                createMockCountry('Australia'),
                createMockCountry('Austria')
              ]
            );
          done();
        },
        error: done.fail
      });
    }) // end of test case

    it('should return an empty list if no match found', (done: DoneFn) => {
        service.filterCountriesByName('mars').subscribe({
          next: countries => {
            expect(countries).toEqual([]);
            done();
          },
          error: done.fail
        });
    })

    it('should return empty array on error case', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        error: { code: 404, message: 'Bad Request' }
      });
      httpClientSpy.get.and.returnValue(of(errorResponse));

      service.filterCountriesByName('invalid').subscribe({
        next: country => {
          expect(country)
            .toEqual([]);
          done();
        },
        error: done.fail
      });

    }); // end of test case

  })

});
