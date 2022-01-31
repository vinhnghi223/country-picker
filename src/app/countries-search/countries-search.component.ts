import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Country } from '../common/model';

import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries-search',
  templateUrl: './countries-search.component.html',
  styleUrls: ['./countries-search.component.scss']
})
export class CountriesSearchComponent implements OnInit {

  private countrySearchSubject = new Subject<string>();
  filteredCountries$: Observable<Country[]> = of([])
  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.filteredCountries$ = this.countriesService.countries$
    this.countrySearchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(countryName => {
      this.filteredCountries$ = this.countriesService.filterCountriesByName(countryName)
    })

  }

  updateSearch(country: string): void {
    this.countrySearchSubject.next(country)
  }

}
