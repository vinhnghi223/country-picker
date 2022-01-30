import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/common/model';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  @Input()
  countries: Country[] = [];
  
  ngOnInit(): void {}

}
