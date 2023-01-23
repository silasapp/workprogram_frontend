import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { CompanyModule } from './company/company.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ApplicationComponent } from './application/application.component';
import { ViewApplicationComponent } from './application/viewapplication/viewapplication.component';
import { ProcessApplicationComponent } from './application/process-application/process-application.component';
import { AllApplicationsComponent } from './application/allapplications/allapplications.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { ConcessionsFieldsComponent } from './company/concessions-fields/concessions-fields.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSliderModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CompanyModule,
    NgChartsModule,
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
