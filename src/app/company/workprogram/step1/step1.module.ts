import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Step1RoutingModule} from './step1-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SWPConcessionSituationComponent } from './concession-situation.component';
import { SWPDrillingOperationsComponent } from './drilling-operations.component';
import { SWPGeophysicalActivitiesComponent } from './geophysical-activities.component';
import { Step1Component } from './step1.component';

@NgModule({
  declarations: [  
    Step1Component,
    SWPConcessionSituationComponent,
    SWPDrillingOperationsComponent,
    SWPGeophysicalActivitiesComponent
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
    Step1RoutingModule
  ]
})
export class Step1Module { }
