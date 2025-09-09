import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Permission, Role, TestCase, TestSuite, User } from './models';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  permissions$ = new BehaviorSubject<Permission[]>([
    { id: 'create_suite', name: 'Create Suite' },
    { id: 'create_case', name: 'Create Case' }
  ]);

  roles$ = new BehaviorSubject<Role[]>([
    { id: 'admin', name: 'Admin', permissionIds: ['create_suite','create_case'] },
    { id: 'tester', name: 'Tester', permissionIds: ['create_case'] }
  ]);

  users$ = new BehaviorSubject<User[]>([
    { id: 'u1', name: 'Alice', email: 'alice@example.com', roleIds: ['admin'] },
    { id: 'u2', name: 'Bob', email: 'bob@example.com', roleIds: ['tester'] }
  ]);

  suites$ = new BehaviorSubject<TestSuite[]>([
    { id: 'login_suite', name: 'login_suite', caseIds: ['login','forgot'] },
    { id: 'home_page_suite', name: 'home_page_suite', caseIds: [] }
  ]);

  cases$ = new BehaviorSubject<TestCase[]>([
    { id: 'login', name: 'login case', steps: [] },
    { id: 'forgot', name: 'forgot password case', steps: [] }
  ]);

  addSuite(name: string): void {
    const id = name.toLowerCase().replace(/\s+/g, '_');
    const suites = this.suites$.value.concat({ id, name, caseIds: [] });
    this.suites$.next(suites);
  }

  addCase(suiteId: string, name: string): void {
    const id = name.toLowerCase().replace(/\s+/g, '_');
    this.cases$.next(this.cases$.value.concat({ id, name, steps: [] }));
    this.suites$.next(this.suites$.value.map(s => s.id === suiteId ? { ...s, caseIds: s.caseIds.concat(id) } : s));
  }

  renameSuite(suiteId: string, newName: string): void {
    this.suites$.next(this.suites$.value.map(s => s.id === suiteId ? { ...s, name: newName } : s));
  }

  deleteSuite(suiteId: string): void {
    const suite = this.suites$.value.find(s => s.id === suiteId);
    // Remove suite
    this.suites$.next(this.suites$.value.filter(s => s.id !== suiteId));
    if (suite) {
      // Delete cases that belonged exclusively to this suite
      const caseIdsToDelete = new Set(suite.caseIds);
      this.cases$.next(this.cases$.value.filter(c => !caseIdsToDelete.has(c.id)));
    }
  }

  renameCase(caseId: string, newName: string): void {
    this.cases$.next(this.cases$.value.map(c => c.id === caseId ? { ...c, name: newName } : c));
  }

  deleteCase(suiteId: string, caseId: string): void {
    // Remove case from suite mapping
    this.suites$.next(this.suites$.value.map(s => s.id === suiteId ? { ...s, caseIds: s.caseIds.filter(id => id !== caseId) } : s));
    // Remove case entity
    this.cases$.next(this.cases$.value.filter(c => c.id !== caseId));
  }

  addRole(name: string): void {
    const id = name.toLowerCase().replace(/\s+/g, '_');
    this.roles$.next(this.roles$.value.concat({ id, name, permissionIds: [] }));
  }

  updateRolePermissions(roleId: string, permissionIds: string[]): void {
    this.roles$.next(this.roles$.value.map(r => r.id === roleId ? { ...r, permissionIds } : r));
  }

  upsertUser(user: User): void {
    if (user.id) {
      this.users$.next(this.users$.value.map(u => u.id === user.id ? { ...u, ...user } : u));
    } else {
      const id = 'u' + Date.now();
      this.users$.next(this.users$.value.concat({ ...user, id } as User));
    }
  }
}

