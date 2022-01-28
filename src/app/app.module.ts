import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesSearchComponent } from './countries-search/countries-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailComponent,
    CountriesListComponent,
    CountriesSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
