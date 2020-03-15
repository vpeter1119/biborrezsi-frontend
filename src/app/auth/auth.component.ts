import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { AuthService } from './auth.service';
import { LoadingService } from '../common_services/loading.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private _loading: LoadingService
    ) { }

  ngOnInit() {
    this._loading.getServerStatus();
  }

  onLogin(form: NgForm) {    
    if (form.invalid) {
      window.alert("Hibás kitöltés!")
      return;
    } else {
      this._loading.switchLoading(true);
      var loginCompleted = new Promise((resolve, reject) => {
        this.authService.login("user", form.value.password);
        setTimeout(()=>{
          var loginOk = this.authService.getAuthStatus();
          console.warn(loginOk);
          resolve(loginOk);
        },1000);
      });
      loginCompleted.then(loginOk => {
        if (loginOk) {
          console.warn("Login OK.");
          this.router.navigate(["report"]);
        } else {
          console.warn("Login failed.");
          this._loading.switchLoading(false);
        }
      });
      

    }
    this._loading.switchLoading(true);
    form.resetForm();
  }

}