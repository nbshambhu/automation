import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PermissionsRoutingModule } from './permissions.routing';
import { PermissionsComponent } from './views/permissions/permissions.component';

@NgModule({
  declarations: [PermissionsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PermissionsRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PermissionsModule {}

