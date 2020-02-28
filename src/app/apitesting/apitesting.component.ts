import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { ApiTestingService } from './apitesting.service';

@Component({
  selector: 'app-apitesting',
  templateUrl: './apitesting.component.html',
  styleUrls: ['./apitesting.component.css']
})
export class ApitestingComponent implements OnInit, OnDestroy {

  apiurl = 'https://restcountries.eu/rest/v2/';
  reqCountry;
  countries = [];
  private countriesSub: Subscription;  
  private countrySub: Subscription;
  options: string[] = [];
  countryError = false;

  constructor(
    private http: HttpClient,
    private api: ApiTestingService
    ) { }

  ngOnInit() {
    this.countryError = false;
    this.api.GetAllCountries();
    this.countriesSub = this.api.GetUpdateListener()
    .subscribe(countries => {
      this.countries = countries;      
      this.countries.forEach(country => {
        this.options.push(country.name);
      })
    })
  }

  ngOnDestroy() {
    this.countriesSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.options.indexOf(form.value.country) !== -1) {
      this.countryError = false;
      let countryName = form.value.country;
      this.api.GetCountryByName(countryName);
      this.reqCountry = this.api.GetCountryListener()
      .subscribe(country => {
        this.reqCountry = country[0];      
      })
      form.resetForm();
    } else {
      if (form.value.country != null) {
        console.log('Requested country (' + form.value.country + ') does not exist.');        
        this.countryError = true;
        form.resetForm();
      } else {
        console.log('No country selected.');        
        this.countryError = false;
        form.reset();
      }      
    }    
  }
}