import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ReportService {

  //apiUrl = 'https://br-server-staging.herokuapp.com/api/';
  apiUrl = 'https://biborrezsi-server.herokuapp.com/api/';
  previousReports = [];
  previousReportsSubject = new Subject();
  reportSubmitResponseListener = new Subject();

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) { }

  postReport(data) {
    var url = this.apiUrl + 'reports';
    console.warn('Sending POST request to: ' + url);
    console.warn('Report data: ' + data);
    this.http.post<{message: string, report: any, errcode: string}>(url, data)
    .subscribe(response => {
      console.warn('Response from server: ' + response.message);
      console.warn(response.report);
      if (response.report) {
        this.reportSubmitResponseListener.next(response.report);
        window.alert(response.message);
        window.location.href = 'https://www.youtube.com/watch?v=Jt061BAbkQs';
      }
    }, error => {
      console.warn(error);
      window.alert(error.error.message);
    });
  }

  getAllReports() {
    var url = this.apiUrl + 'reports';
    console.warn('Sending GET request to: ' + url);
    this.http.get(url)
    .subscribe(response => {
      this.previousReports = response;
      this.previousReportsSubject.next([...this.previousReports]);
    })
  }

  getAllReportsListener() {
    this.getAllReports();
    return this.previousReportsSubject.asObservable();
  }

}