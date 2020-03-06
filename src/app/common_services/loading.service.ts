import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject} from 'rxjs';

@Injectable({providedIn: "root"})
export class LoadingService {

  apiUrl = 'https://biborrezsi-server.herokuapp.com/api/';

  isLoading: boolean;
  serverIsUp: boolean = false;
  serverStatusListener = new Subject<boolean>();

  constructor(
    private _http: HttpClient,
  ){}

  switchLoading(b: boolean) {
    this.isLoading = b;
  }

  getServerStatus() { //pings the server to wake up
    var url = (this.apiUrl + "status");
    this._http.get<{running:boolean}>(url)
    .subscribe(status => {
      if (status.running == true) {
        console.warn(status);
        console.warn("Server is up.");
        this.serverIsUp = status.running;
        this.serverStatusListener.next(this.serverIsUp);
      } else {
        console.warn(status);
        this.serverIsUp = false;
        this.serverStatusListener.next(this.serverIsUp);
      }
    }, error => {
      console.warn(error);
      this.serverIsUp = false;
      this.serverStatusListener.next(this.serverIsUp);
      //in this case, we should also disable the frontend functions and display a message that server is down
    });
  }

  getServerStatusListener() {
    this.getServerStatus;
    return this.serverStatusListener.asObservable();
  }

}