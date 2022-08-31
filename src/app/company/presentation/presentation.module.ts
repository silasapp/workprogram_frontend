import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { SelectDateComponent } from './select-date/select-date.component';
import { UploadPresentationComponent } from './upload-presentation/upload-presentation.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    SelectDateComponent,
    UploadPresentationComponent
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PresentationModule { }
