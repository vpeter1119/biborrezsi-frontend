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
  MatSnackBarModule,
  MatTooltipModule,
  MatIconModule,
  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApitestingComponent } from './apitesting/apitesting.component';
import { ReportService } from './report/report.service';
import { AuthGuard } from "./auth/auth-guard";
import { IconsService } from './common_services/icons.service';
import { LoadingService } from './common_services/loading.service';
import { ServerDownComponent } from './server-down/server-down.component';

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
    redirectTo: 'report',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'auth' }
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
    MatTooltipModule,
    MatIconModule,
    BrowserAnimationsModule,
    FontAwesomeModule
    ],
  declarations: [ 
    AppComponent, 
    ReportComponent, 
    AuthComponent, 
    ApitestingComponent, ServerDownComponent,  
    ],
  bootstrap:    [ 
    AppComponent 
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ReportService,
    AuthGuard,
    IconsService,
    LoadingService,
  ]
})
export class AppModule { }
