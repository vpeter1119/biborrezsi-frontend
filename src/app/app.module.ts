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

const appRoutes: Routes = [
  { path: 'report', component: ReportComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'testing', component: ApitestingComponent },
  // { path: 'history',      component: ReportHistoryComponent },  
  { path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
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
    ReportService
  ]
})
export class AppModule { }
