import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html'
})
export class EditRoleDialogComponent {
  form = this.fb.group({ name: [''] });
  constructor(private fb: FormBuilder, private ref: MatDialogRef<EditRoleDialogComponent>) {}
  save() { this.ref.close(this.form.value); }
}

