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
import { SeismicDataApprovedPreviousComponent } from './seismic-data-approved-previous.component';
import { SeismicDataApproved2yrsagoComponent } from './seismic-data-approved-2yrsago.component';
import { SeismicProcessingCurrentComponent } from './seismic-process-current.component';
import { SeismicProcessingPreviousComponent } from './seismic-processing-previous.component';
import { ExplorationWellsComponent } from './exploration-wells.component';
import { AppraisalWellsComponent } from './appraisal-wells.component';
import { DevelopmentWellsComponent } from './development-wells.component';
import { ReserveUpdateComponent } from './reserves-update.component';
import { OilProductionComponent } from './oil-production.component';
import { OilProductionContractComponent } from './oil-production-contract.component';
import { MonthlyOilProductionComponent } from './monthly-oil-production.component';


@NgModule({
  declarations: [
    Colum,
    SeismicActivitiesApprovedComponent,
    SeismicDataApprovedPreviousComponent,
    SeismicDataApproved2yrsagoComponent,
    SeismicProcessingCurrentComponent,
    SeismicProcessingPreviousComponent,
    ExplorationWellsComponent,
    AppraisalWellsComponent,
    DevelopmentWellsComponent,
    ReserveUpdateComponent,
    OilProductionComponent,
    OilProductionContractComponent,
    MonthlyOilProductionComponent,
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
