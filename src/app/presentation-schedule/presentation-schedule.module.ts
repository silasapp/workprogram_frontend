import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PresentationScheduleRoutingModule } from './presentation-schedule-routing.module';
import { ScribesAndChairmenComponent } from './scribes-and-chairmen/scribes-and-chairmen.component';
import { DivisionComponent } from './division/division.component';
import { UpdateRepsComponent } from './scribes-and-chairmen/update-reps/update-reps.component';
import { UploadMomComponent } from './scribes-and-chairmen/upload-mom/upload-mom.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    ScribesAndChairmenComponent,
    DivisionComponent,
    UpdateRepsComponent,
    UploadMomComponent
  ],
  imports: [
    CommonModule,
    PresentationScheduleRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class PresentationScheduleModule { }
