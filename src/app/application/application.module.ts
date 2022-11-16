import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AllApplicationsComponent } from './allapplications/allapplications.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ViewApplicationComponent } from './viewapplication/viewapplication.component';
import { MydeskComponent } from './mydesk/mydesk.component';
import { AllcompaniesComponent } from './allcompanies/allcompanies.component';
import { ProcessApplicationComponent } from './process-application/process-application.component';
import { AllapprovalsComponent } from './allapprovals/allapprovals.component';



  @NgModule({
    imports: [
      CommonModule,
      ApplicationRoutingModule,
      MatFormFieldModule,
      MatTableModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatIconModule,
      MatDialogModule,
      MatSelectModule,
      MatButtonModule
    ],
    declarations: [
      AllApplicationsComponent,
      ProcessApplicationComponent,
      ViewApplicationComponent,
      MydeskComponent,
      AllcompaniesComponent,
      AllapprovalsComponent
  
    ]
  })
  export class ApplicationModule { }
  