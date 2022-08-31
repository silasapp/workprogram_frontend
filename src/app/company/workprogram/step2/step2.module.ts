import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Step2RoutingModule} from './step2-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SWPFieldDevelopmentComponent } from './field-development.component';
import { SWPGasProductionComponent } from './gas-production-activities.component';
import { SWPInitialWellCompletionComponent } from './initial-well-completion.component';
import { SWPProductionOilComponent } from './production-oil.component';
import { SWPReserveUpdateComponent } from './reserves-update-mmbls.component';
import { SWPWorkoverRecompletionComponent } from './workover-recompletion.component';
import { Step2Component } from './step2.component';
import { OilGasProductionActivitiesComponent } from './oil-gas-production-activities.component';

@NgModule({
  declarations: [  
    Step2Component,
    SWPFieldDevelopmentComponent,
    SWPGasProductionComponent,
    SWPInitialWellCompletionComponent,
    SWPReserveUpdateComponent,
    SWPProductionOilComponent,
    SWPWorkoverRecompletionComponent,
    OilGasProductionActivitiesComponent
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
    Step2RoutingModule
  ]
})
export class Step2Module { }
