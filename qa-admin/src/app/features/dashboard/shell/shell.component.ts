import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockDbService } from '../../../core/mock-db.service';
import { TestCase, TestSuite } from '../../../core/models';

interface SuiteCaseNode {
  type: 'suite' | 'case';
  id: string;
  name: string;
  suiteId?: string; // present when node is a case
  children?: SuiteCaseNode[];
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  isOpened = true;
  treeControl: NestedTreeControl<SuiteCaseNode> = new NestedTreeControl<SuiteCaseNode>((node: SuiteCaseNode) => node.children || []);
  dataSource: MatTreeNestedDataSource<SuiteCaseNode> = new MatTreeNestedDataSource<SuiteCaseNode>();

  constructor(private router: Router, private db: MockDbService) {
    combineLatest([this.db.suites$, this.db.cases$]).pipe(
      map(([suites, cases]: [TestSuite[], TestCase[]]) =>
        suites.map((s: TestSuite) => ({
          type: 'suite' as const,
          id: s.id,
          name: s.name,
          children: s.caseIds
            .map((id: string) => cases.find((c: TestCase) => c.id === id))
            .filter((c): c is TestCase => Boolean(c))
            .map((c: TestCase) => ({ type: 'case' as const, id: c.id, name: c.name, suiteId: s.id }))
        }))
      )
    ).subscribe((data: SuiteCaseNode[]) => {
      this.dataSource.data = data;
    });
  }

  hasChild = (_: number, node: SuiteCaseNode): boolean => !!node.children && node.children.length > 0;

  // Actions
  addSuite(): void {
    const name = prompt('New Suite name');
    if (name && name.trim()) this.db.addSuite(name.trim());
  }

  renameSuite(node: SuiteCaseNode): void {
    const name = prompt('Rename suite', node.name);
    if (name && name.trim()) this.db.renameSuite(node.id, name.trim());
  }

  deleteSuite(node: SuiteCaseNode): void {
    const ok = confirm(`Delete suite "${node.name}" and its cases?`);
    if (ok) this.db.deleteSuite(node.id);
  }

  addCase(suiteNode: SuiteCaseNode): void {
    const name = prompt('New Test Case name');
    if (name && name.trim()) this.db.addCase(suiteNode.id, name.trim());
  }

  renameCase(caseNode: SuiteCaseNode): void {
    const name = prompt('Rename case', caseNode.name);
    if (name && name.trim()) this.db.renameCase(caseNode.id, name.trim());
  }

  deleteCase(suiteNodeOrId: SuiteCaseNode | string | undefined, caseNode: SuiteCaseNode): void {
    const suiteId = typeof suiteNodeOrId === 'string' ? suiteNodeOrId : suiteNodeOrId?.suiteId || suiteNodeOrId?.id || caseNode.suiteId;
    if (!suiteId) return;
    const ok = confirm(`Delete test case "${caseNode.name}"?`);
    if (ok) this.db.deleteCase(suiteId, caseNode.id);
  }

  openCase(suiteNodeOrId: SuiteCaseNode | string | undefined, caseNode: SuiteCaseNode): void {
    const suiteId = typeof suiteNodeOrId === 'string' ? suiteNodeOrId : suiteNodeOrId?.suiteId || suiteNodeOrId?.id || caseNode.suiteId;
    if (!suiteId) return;
    this.router.navigate(['/dashboard/tests/suite', suiteId, 'case', caseNode.id]);
  }
}

