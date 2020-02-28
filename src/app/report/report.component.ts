import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ReportService } from './report.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  reportMode = 'input';
  authenticated = false;
  url = '';
  heatStay = false;
  newReport = {};
  allReports = [];
  allReportsSub: Subscription;
  oldReport = {};
  diffData = {};

  constructor(
    public _router: Router,
    private _auth: AuthService,
    private _report: ReportService,
    private http: HttpClient,
    private _fb: FormBuilder,
    private mainApp: AppComponent,
    ) { }

  reportForm = this._fb.group({
    cold: [null,Validators.required],
    hot: [null, Validators.required],
    heat: [null],
    elec: [null, Validators.required],
    isHeating: [false,Validators.required],
  });

  ngOnInit() {
    this.authenticated = this._auth.authStatus;
    this.allReportsSub = this._report.getAllReportsListener()
    .subscribe(reports => {
      this.allReports = reports;
      this.oldReport = this.allReports[(this.allReports.length - 1)];
      console.warn("Report component initiated.");
      this.mainApp.switchLoading(false);
    });
  }

  ngOnDestroy() {
    this.allReportsSub.unsubscribe();
  }

  onSubmit() {
    this.newReport = this.reportForm.value;
    this.calculateDiff();
    this.reportMode = 'confirm';
  }

  onReport() {
    console.warn('Making POST request to: ' + this.url);
    this._report.postReport(this.reportForm.value);
  }

  calculateDiff() {
    this.diffData = {
      cold: ((this.reportForm.value.cold - this.oldReport.cold).toFixed(3)),
      hot: ((this.reportForm.value.hot - this.oldReport.hot).toFixed(3)),
      heat: (this.reportForm.value.heat - this.oldReport.heat),
      elec: (this.reportForm.value.elec - this.oldReport.elec),
    }
  }

  switchHeatStay() {
    this.heatStay = !this.heatStay;
    if (this.heatStay) {
      this.reportForm.controls.heat.disable();
    } else {
      this.reportForm.controls.heat.enable();
    }
  }

}