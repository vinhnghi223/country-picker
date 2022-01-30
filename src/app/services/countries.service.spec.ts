import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Country, DefaultCountry } from '../model';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const createMockCountry = (countryName: string) => {
    return {  ...DefaultCountry, name: countryName}
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

    it('should get and make all countries available via $countries', (done: DoneFn) => {
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

    it('should return an empty default country if no country found or request fails', (done: DoneFn) => {

      httpClientSpy.get.and.returnValue(of({status:404, message:'Not Found'}));
      
      service.getCountry('Helsinki').subscribe({
        next: country => {
          expect(country)
            .toEqual(DefaultCountry);
          done();
        },
        error: done.fail
      });

    }); // end of test case

    it('should return DefaultCountry on error case', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        error: { code: 404, message: 'Bad Request' }
      });
      httpClientSpy.get.and.returnValue(of(errorResponse));

      service.getCountry('invalid').subscribe({
        next: country => {
          expect(country)
            .toEqual(DefaultCountry);
          done();
        },
        error: done.fail
      });

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

      service.getCountry('invalid').subscribe({
        next: country => {
          expect(country)
            .toEqual(DefaultCountry);
          done();
        },
        error: done.fail
      });

    }); // end of test case

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
