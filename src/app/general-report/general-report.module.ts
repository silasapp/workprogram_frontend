import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {GeneralReportRoutingModule} from './general-report-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';

import { Colum } from './colum';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';
import { GeneralReportComponent } from './general-report.component';
import { ExecutiveSummaryComponent } from './executive-summary.component';


@NgModule({
  declarations: [
    Colum,
    SeismicActivitiesApprovedComponent,
    GeneralReportComponent,
    ExecutiveSummaryComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    GeneralReportRoutingModule
  ]
})
export class GeneralReportModule { }
