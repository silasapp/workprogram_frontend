import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CompanyRoutingModule } from './company-routing.module';
import { PresentationModule } from './presentation/presentation.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CompanyComponent } from './company.component';
import { ApplicationComponent } from '../application/application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './dashboard/landing.component';

import { ResetPasswordComponent } from './dashboard/resetpassword.component';
import { ConcessionsfieldsComponent } from './dashboard/concessionsfields.component';


@NgModule({
  declarations: [
    CompanyDetailsComponent, CompanyComponent, DashboardComponent, LandingComponent, ResetPasswordComponent, ConcessionsfieldsComponent, ApplicationComponent
  ],
  imports: [

    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    CompanyRoutingModule,
    PresentationModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class CompanyModule { }
