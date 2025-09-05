import { Component } from '@angular/core';
import { MockDbService } from '../../../../core/mock-db.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent {
  permissions$ = this.db.permissions$;
  newName = '';
  constructor(private db: MockDbService) {}
  add() {
    const name = this.newName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, '_');
    this.db.permissions$.next(this.db.permissions$.value.concat({ id, name }));
    this.newName = '';
  }
}

