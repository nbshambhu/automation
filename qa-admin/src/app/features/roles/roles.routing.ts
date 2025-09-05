import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './views/roles/roles.component';
import { RoleDetailComponent } from './views/role-detail/role-detail.component';

const routes: Routes = [
  { path: '', component: RolesComponent },
  { path: ':roleId', component: RoleDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}

