import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { 
  FormsModule,
  ReactiveFormsModule,
   } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApitestingComponent } from './apitesting/apitesting.component';
import { ReportService } from './report/report.service';
import { AuthGuard } from "./auth/auth-guard";

const appRoutes: Routes = [
  { 
    path: 'report', 
    component: ReportComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'testing', component: ApitestingComponent },
  // { path: 'history',      component: ReportHistoryComponent },  
  { 
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports:      [ 
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BrowserAnimationsModule
    ],
  declarations: [ 
    AppComponent, 
    ReportComponent, 
    AuthComponent, 
    ApitestingComponent,  
    ],
  bootstrap:    [ 
    AppComponent 
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ReportService,
    AuthGuard,
  ]
})
export class AppModule { }
