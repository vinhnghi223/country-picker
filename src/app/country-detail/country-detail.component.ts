import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DEFAULT_COUNTRY } from '../common/constants';
import { Country } from '../common/model';

import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  providers: [CountryService]
})
export class CountryDetailComponent implements OnInit {

  country$: Observable<Country> = of(DEFAULT_COUNTRY)

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit(): void {
    this.route.url
      .subscribe(paths => {
        const countryName = paths[1].path
        this.country$ = this.countryService.getCountry(countryName)
      });
  }

}
