import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Step5RoutingModule } from './step5-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { Step5Component } from './step5.component';
import { SWPHseComponent } from './hse.component';
import { SWPScdpComponent } from './scdp.component';
import { SWPRequirementComponent } from './requirement.component';

@NgModule({
  declarations: [
    Step5Component,
    SWPHseComponent,
    SWPScdpComponent,
    SWPRequirementComponent,
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
    Step5RoutingModule
  ]
})
export class Step5Module { }
