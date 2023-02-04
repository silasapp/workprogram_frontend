import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfilingComponent } from './company-profiling/company-profiling.component';
import { CompanyProfilingRoutingModule } from './company-profiling-routing/company-profiling-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddSBUFormComponent } from './company-profiling/add-sbu/add-sbu-form.component';
import { DeleteSBUComponent } from './company-profiling/delete-sbu/delete-sbu.component';

@NgModule({
  declarations: [
    CompanyProfilingComponent,
    AddSBUFormComponent,
    DeleteSBUComponent,
  ],
  imports: [
    CommonModule,
    CompanyProfilingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class CompanyProfilingModule {}
