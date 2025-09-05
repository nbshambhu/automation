import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RolesRoutingModule } from './roles.routing';
import { RolesComponent } from './views/roles/roles.component';
import { EditRoleDialogComponent } from './views/edit-role-dialog/edit-role-dialog.component';
import { RoleDetailComponent } from './views/role-detail/role-detail.component';

@NgModule({
  declarations: [RolesComponent, EditRoleDialogComponent, RoleDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class RolesModule {}

