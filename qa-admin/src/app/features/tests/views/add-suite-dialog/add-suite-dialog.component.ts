import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-suite-dialog',
  templateUrl: './add-suite-dialog.component.html'
})
export class AddSuiteDialogComponent {
  name = '';
  constructor(private ref: MatDialogRef<AddSuiteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { name?: string } | null) {
    this.name = data?.name || '';
  }
  save() { if (this.name.trim()) this.ref.close(this.name.trim()); }
}

