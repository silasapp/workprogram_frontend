import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleConfigurationComponent } from './role-configuration/role-configuration.component';
import { RoleConfigurationRoutingModule } from './role-configuration-routing/sbu-configuration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddRoleFormComponent } from './role-configuration/add-role/add-role-form.component';
import { DeleteRoleComponent } from './role-configuration/delete-role/delete-role.component';

@NgModule({
  declarations: [
    RoleConfigurationComponent,
    AddRoleFormComponent,
    DeleteRoleComponent,
  ],
  imports: [
    CommonModule,
    RoleConfigurationRoutingModule,
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
export class RoleConfigurationModule {}
