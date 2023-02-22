import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableViewComponent } from './table-view.component';
import { TableRoutingModule } from './table-view-routing.module';


@NgModule({
  declarations: [
    TableViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableRoutingModule
  ]
})
export class TableModule { }
