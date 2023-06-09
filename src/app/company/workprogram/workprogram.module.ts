import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {WorkProgramRoutingModule} from './workprogram-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {BoardComponent } from './board.component';
import { StartComponent } from './start.component';
import { ConcessionBaseComponent } from './concession-base.component';


@NgModule({
  declarations: [
    BoardComponent,
    StartComponent,
    ConcessionBaseComponent
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
    WorkProgramRoutingModule
  ],
  exports: [BoardComponent, ConcessionBaseComponent]
})
export class WorkProgramModule { }
