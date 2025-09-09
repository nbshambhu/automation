import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddSuiteDialogComponent } from '../add-suite-dialog/add-suite-dialog.component';
import { AddCaseDialogComponent } from '../add-case-dialog/add-case-dialog.component';
import { MockDbService } from '../../../../core/mock-db.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-suites',
  templateUrl: './suites.component.html',
  styleUrls: ['./suites.component.scss']
})
export class SuitesComponent {
  vm$ = combineLatest([this.db.suites$, this.db.cases$]).pipe(
    map(([suites, cases]) => suites.map(s => ({
      ...s,
      cases: s.caseIds.map(id => cases.find(c => c.id === id)).filter(Boolean)
    })))
  );

  constructor(private dialog: MatDialog, private router: Router, private db: MockDbService) {}

  addSuite(): void {
    this.dialog.open(AddSuiteDialogComponent).afterClosed().subscribe(name => {
      if (name) this.db.addSuite(name);
    });
  }

  addCase(suite: any): void {
    this.dialog.open(AddCaseDialogComponent).afterClosed().subscribe(name => {
      if (name) this.db.addCase(suite.id, name);
    });
  }

  openCase(suite: any, testCase: any): void {
    this.router.navigate(['/dashboard/tests/suite', suite.id, 'case', testCase.id]);
  }

  renameSuite(suite: any): void {
    this.dialog.open(AddSuiteDialogComponent, { data: { name: suite.name } }).afterClosed().subscribe(name => {
      if (name) this.db.renameSuite(suite.id, name);
    });
  }

  deleteSuite(suite: any): void {
    const ok = confirm(`Delete suite "${suite.name}" and its cases?`);
    if (ok) this.db.deleteSuite(suite.id);
  }

  renameCase(suite: any, testCase: any): void {
    this.dialog.open(AddCaseDialogComponent, { data: { name: testCase.name } }).afterClosed().subscribe(name => {
      if (name) this.db.renameCase(testCase.id, name);
    });
  }

  deleteCase(suite: any, testCase: any): void {
    const ok = confirm(`Delete test case "${testCase.name}"?`);
    if (ok) this.db.deleteCase(suite.id, testCase.id);
  }
}

