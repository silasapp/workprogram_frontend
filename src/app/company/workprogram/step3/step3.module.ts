import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Step1RoutingModule} from './step3-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { Step3Component } from './step3.component';
import { SWPBudgetPerformanceComponent } from './budget-performance.component';
import { SWPBudgetProposalComponent } from './budget-proposal.component';
import { SWPOilAndGasFacilityMaintenanceComponent } from './oil-and-gas-facility-maintenance.component';

@NgModule({
  declarations: [  
    Step3Component,
    SWPBudgetPerformanceComponent,
    SWPBudgetProposalComponent,
    SWPOilAndGasFacilityMaintenanceComponent
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
export class Step3Module { }
