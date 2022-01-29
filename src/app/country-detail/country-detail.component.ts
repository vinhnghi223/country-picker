import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Country, DefaultCountry } from '../model';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  country$: Observable<Country> = of(DefaultCountry)

  constructor(private route: ActivatedRoute, private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.route.url
      .subscribe(paths => {
        const countryName = paths[1].path
        this.country$ = this.countriesService.getCountry(countryName)
      });
  }

}
