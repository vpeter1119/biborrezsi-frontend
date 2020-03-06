import { Component, OnInit } from '@angular/core';
import { LoadingService } from './common_services/loading.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  isLoading: boolean;
  serverIsUp = true;
  serverStatusSub: Subscription;

  constructor(
    private _loading: LoadingService,
  ) {}

  ngOnInit(){
    this.isLoading = true;
    this.serverStatusSub = this._loading.getServerStatusListener()
    .subscribe(running => {
      this.serverIsUp = running;
      this.isLoading = false;
    }, err => {
      this.serverIsUp = false;
      this.isLoading = false;
    });
  }

}
;