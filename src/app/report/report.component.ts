import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import moment from 'moment';
moment.defineLocale('en-hu', {
  parentLocale: 'en',
  months: ["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"]
});
moment.locale('en-hu');

import { AuthService } from '../auth/auth.service';
import { ReportService } from './report.service';
import { IconsService } from '../common_services/icons.service';
import { LoadingService } from '../common_services/loading.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  reportMode = 'input';
  authenticated = false;
  url = '';
  newReport = {};
  allReports = [];
  allReportsSub: Subscription;
  oldReport = {};
  diffData = {};
  diffIsValid = false;
  icons = {};
  startingDate = moment([2019,7]);
  currentReportPeriodIndex = 0;
  currentReportPeriod = "";

  constructor(
    public _router: Router,
    private _auth: AuthService,
    private _report: ReportService,
    private _icons: IconsService,
    private http: HttpClient,
    private _fb: FormBuilder,
    private _loading: LoadingService,
    ) {
      this.icons = this._icons.getIcons();
     }

  reportForm = this._fb.group({
    cold: [null,Validators.required],
    hot: [null, Validators.required],
    heat: [null],
    elec: [null, Validators.required],
    isHeating: [false,Validators.required],
  });

  ngOnInit() {
    this._loading.switchLoading(true);
    this.authenticated = this._auth.authStatus;
    this.allReportsSub = this._report.getAllReportsListener()
    .subscribe(reports => {
      this.allReports = reports;
      this.oldReport = this.allReports[(this.allReports.length - 1)];
      this.currentReportPeriodIndex = this.oldReport.nr+1;
      this.currentReportPeriod = this.startingDate.add(this.currentReportPeriodIndex, 'months').format("MMMM, YYYY");
      console.warn("Report component initiated.");
      this._loading.switchLoading(false);
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
    this._loading.switchLoading(true);
    console.warn('Making POST request to: ' + this.url);
    this._report.postReportListener(this.reportForm.value)
    .subscribe(res => {
      console.warn(res.message);
      if (res) {
        this.reportMode = 'finished';
        this._loading.switchLoading(false);
      }
    }, err => {
      if (err) {
        console.warn(err);
        this._loading.switchLoading(false);
      }
    });
  }

  resetAll() {
    this.reportMode = 'input';
    this.reportForm.reset();
  }

  calculateDiff() {
    this.diffIsValid = false;
    var heatDiff;
    if (this.reportForm.value.heat == 0) {
      heatDiff = 0;
    } else {
      heatDiff = (this.reportForm.value.heat - this.oldReport.heat)
    }
    this.diffData = {
      cold: ((this.reportForm.value.cold - this.oldReport.cold).toFixed(3)),
      hot: ((this.reportForm.value.hot - this.oldReport.hot).toFixed(3)),
      heat: heatDiff,
      elec: (this.reportForm.value.elec - this.oldReport.elec),
    }
    if (this.diffData.cold >= 0) {
      this.diffIsValid = true;
    }
  }

  showTooltip(id) {
    
  }

}