import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountriesListComponent } from './countries-search/countries-list/countries-list.component';
import { CountriesSearchComponent } from './countries-search/countries-search.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailComponent,
    CountriesListComponent,
    CountriesSearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // import HttpClientModule after BrowserModule to use HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
