import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { MockDbService } from '../../../../core/mock-db.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent {
  vm$ = combineLatest([
    this.db.roles$,
    this.db.permissions$,
    this.route.paramMap
  ]).pipe(
    map(([roles, perms, params]) => {
      const role = roles.find(r => r.id === params.get('roleId'));
      return { role, perms };
    })
  );

  constructor(private db: MockDbService, private route: ActivatedRoute) {}

  onToggle(roleId: string, permId: string, checked: boolean) {
    const current = this.db.roles$.value.find(r => r.id === roleId);
    if (!current) return;
    const set = new Set(current.permissionIds);
    checked ? set.add(permId) : set.delete(permId);
    this.db.updateRolePermissions(roleId, Array.from(set));
  }
}

