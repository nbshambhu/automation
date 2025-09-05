import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MockDbService } from '../../../../core/mock-db.service';
import { EditRoleDialogComponent } from '../edit-role-dialog/edit-role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent {
  roles$ = this.db.roles$;
  constructor(private db: MockDbService, private dialog: MatDialog, private router: Router) {}

  addRole(): void {
    this.dialog.open(EditRoleDialogComponent).afterClosed().subscribe((val: any) => {
      if (val?.name) this.db.addRole(val.name);
    });
  }

  openRole(role: any): void {
    this.router.navigate(['/dashboard/roles', role.id]);
  }
}

