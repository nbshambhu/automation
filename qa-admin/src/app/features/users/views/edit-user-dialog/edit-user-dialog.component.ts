import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MockDbService } from '../../../../core/mock-db.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html'
})
export class EditUserDialogComponent {
  roles$ = this.db.roles$;
  form = this.fb.group({ id: [''], name: [''], email: [''], roleIds: [[] as string[]] });

  constructor(
    private fb: FormBuilder,
    private db: MockDbService,
    private ref: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) this.form.patchValue(data);
  }

  save(): void { this.ref.close(this.form.value); }
}

