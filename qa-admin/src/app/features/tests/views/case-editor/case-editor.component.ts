import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-case-editor',
  templateUrl: './case-editor.component.html',
  styleUrls: ['./case-editor.component.scss']
})
export class CaseEditorComponent {
  keywords = ['Click', 'Type', 'AssertText', 'Navigate'];
  elementTypes = ['css', 'xpath', 'id', 'name', 'text'];

  form = this.fb.group({
    steps: this.fb.array<FormGroup>([])
  });

  constructor(private fb: FormBuilder) {
    this.addRow();
  }

  get steps(): FormArray<FormGroup> {
    return this.form.get('steps') as FormArray<FormGroup>;
  }

  newRow(): FormGroup {
    return this.fb.group({
      keyword: [''],
      elementType: ['css'],
      webElement: [''],
      elementValue: [''],
      skip: [false],
      description: [''],
      screenshot: [false]
    });
  }

  addRow(index?: number): void {
    const row = this.newRow();
    if (index === undefined || index < 0 || index >= this.steps.length) {
      this.steps.push(row);
    } else {
      this.steps.insert(index + 1, row);
    }
  }

  removeSelected(): void {
    const toKeep: FormGroup[] = [];
    this.steps.controls.forEach(ctrl => {
      if (!ctrl.value.__selected) toKeep.push(ctrl);
    });
    this.form.setControl('steps', this.fb.array<FormGroup>(toKeep));
  }

  toggleAll(selectAll: boolean): void {
    this.steps.controls.forEach(ctrl => ctrl.patchValue({ __selected: selectAll }));
  }
}

