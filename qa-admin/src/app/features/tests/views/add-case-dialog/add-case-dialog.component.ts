import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-case-dialog',
  templateUrl: './add-case-dialog.component.html'
})
export class AddCaseDialogComponent {
  name = '';
  constructor(private ref: MatDialogRef<AddCaseDialogComponent>) {}
  save() { if (this.name.trim()) this.ref.close(this.name.trim()); }
}

