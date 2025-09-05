import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-suite-dialog',
  templateUrl: './add-suite-dialog.component.html'
})
export class AddSuiteDialogComponent {
  name = '';
  constructor(private ref: MatDialogRef<AddSuiteDialogComponent>) {}
  save() { if (this.name.trim()) this.ref.close(this.name.trim()); }
}

