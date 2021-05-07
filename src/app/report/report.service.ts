import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ReportService {
  //apiUrl = 'https://biborrezsi-server.herokuapp.com/api/';
  apiUrl = 'https://petervertesi.com/dev-server/api/';
  previousReports = [];
  previousReportsSubject = new Subject();
  postReportResponse = new Subject();

  constructor(private http: HttpClient, private _router: Router) {}

  postReport(data) {
    var url = this.apiUrl + 'reports';
    console.warn('Sending POST request to: ' + url);
    this.http.post<{ message: string; errcode: string }>(url, data).subscribe(
      response => {
        console.warn('Response from server: ' + response.message);
        window.alert(response.message);
        this.postReportResponse.next(response);
        //window.location.href = 'https://www.youtube.com/watch?v=Jt061BAbkQs';
      },
      error => {
        console.warn(error);
        window.alert(error.error.message);
      }
    );
  }

  postReportListener(data) {
    this.postReport(data);
    return this.postReportResponse.asObservable();
  }

  getAllReports() {
    var url = this.apiUrl + 'reports';
    console.warn('Sending GET request to: ' + url);
    this.http.get(url).subscribe(response => {
      this.previousReports = response;
      this.previousReportsSubject.next([...this.previousReports]);
    });
  }

  getAllReportsListener() {
    this.getAllReports();
    return this.previousReportsSubject.asObservable();
  }
}
