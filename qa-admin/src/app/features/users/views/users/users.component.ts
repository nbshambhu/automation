import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MockDbService } from '../../../../core/mock-db.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users$ = this.db.users$;
  roles$ = this.db.roles$;

  constructor(private db: MockDbService, private dialog: MatDialog) {}

  addUser(): void {
    this.dialog.open(EditUserDialogComponent, { data: null }).afterClosed().subscribe((val: any) => {
      if (val) this.db.upsertUser(val);
    });
  }

  editUser(user: any): void {
    this.dialog.open(EditUserDialogComponent, { data: user }).afterClosed().subscribe((val: any) => {
      if (val) this.db.upsertUser({ ...user, ...val });
    });
  }
}

