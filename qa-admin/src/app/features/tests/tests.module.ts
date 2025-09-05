import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { TestsRoutingModule } from './tests.routing';
import { SuitesComponent } from './views/suites/suites.component';
import { CaseEditorComponent } from './views/case-editor/case-editor.component';
import { AddSuiteDialogComponent } from './views/add-suite-dialog/add-suite-dialog.component';
import { AddCaseDialogComponent } from './views/add-case-dialog/add-case-dialog.component';

@NgModule({
  declarations: [
    SuitesComponent,
    CaseEditorComponent,
    AddSuiteDialogComponent,
    AddCaseDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TestsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class TestsModule {}

