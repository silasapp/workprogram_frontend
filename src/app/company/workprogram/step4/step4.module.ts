import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Step4RoutingModule} from './step4-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { Step4Component } from './step4.component';
import { SWPNigeriaContentComponent } from './nigeriacontent.component';
import { SWPStrategicPlansComponent } from './strategicplans.component';
import { SWPLegalProceedingsComponent } from './legalproceedings.component';

@NgModule({
  declarations: [  
    Step4Component,
    SWPNigeriaContentComponent,
    SWPStrategicPlansComponent,
    SWPLegalProceedingsComponent
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
    Step4RoutingModule
  ]
})
export class Step4Module { }
