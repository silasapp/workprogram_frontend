import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SBUConfigurationComponent } from './sbu-configuration/sbu-configuration.component';
import { SBUConfigurationRoutingModule } from './sbu-configuration-routing/sbu-configuration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddSBUFormComponent } from './sbu-configuration/add-sbu/add-sbu-form.component';
import { DeleteSBUComponent } from './sbu-configuration/delete-sbu/delete-sbu.component';

@NgModule({
  declarations: [
    SBUConfigurationComponent,
    AddSBUFormComponent,
    DeleteSBUComponent,
  ],
  imports: [
    CommonModule,
    SBUConfigurationRoutingModule,
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
export class SBUConfigurationModule {}
