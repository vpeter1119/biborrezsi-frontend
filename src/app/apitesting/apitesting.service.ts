import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class ApiTestingService {

  private apiurl = 'https://restcountries.eu/rest/v2/';
  private allCountriesList: any[];
  private countriesUpdated = new Subject();
  private reqCountry;
  private countryUpdated = new Subject();

  constructor (private http: HttpClient) {}

  GetUpdateListener() {
    return this.countriesUpdated.asObservable();
  }

  GetAllCountries() {
    let url = this.apiurl + 'all';
    console.log('Sent GET request to: ' + url);
    this.http.get(url)
    .subscribe(response => {
      // console.log('Response from server: ' + response);      
      this.allCountriesList = response;
      this.countriesUpdated.next([...this.allCountriesList]);
      // console.log('Stored variable: ' + this.allCountriesList);
    })
  }

  GetCountryListener() {
    return this.countryUpdated.asObservable();
  }

  GetCountryByName(name) {
    let url = this.apiurl + 'name/' + name + '?fullText=true';
    console.log('Sent GET request to: ' + url);
    this.http.get(url)
    .subscribe(response => {
      this.reqCountry = response;
      this.countryUpdated.next([...this.reqCountry]);
    })
  }
}