import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { AuthService } from './auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private mainApp: AppComponent,
    ) { }

  ngOnInit() {
    this.authService.getServerStatus();
    this.mainApp.switchLoading(false);
  }

  onLogin(form: NgForm) {    
    if (form.invalid) {
      window.alert("Hibás kitöltés!")
      return;
    } else {
      this.authService.login("user", form.value.password);
    }
    this.mainApp.switchLoading(true);
    form.resetForm();
  }

}