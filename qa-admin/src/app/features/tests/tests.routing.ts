import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuitesComponent } from './views/suites/suites.component';
import { CaseEditorComponent } from './views/case-editor/case-editor.component';

const routes: Routes = [
  { path: '', component: SuitesComponent },
  { path: 'suite/:suiteId/case/:caseId', component: CaseEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {}

