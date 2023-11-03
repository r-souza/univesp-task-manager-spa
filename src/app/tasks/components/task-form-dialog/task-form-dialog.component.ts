import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
})
export class TaskFormDialogComponent implements AfterViewChecked {
  @Input() dialogAction: string = 'Adicionar';
  @ViewChild(TaskFormComponent) form!: TaskFormComponent;

  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private cdr: ChangeDetectorRef
  ) {
    if (data.id) {
      this.dialogAction = `Editar #${data.id}`;
    }
  }

  isFormValid(): boolean {
    return this.form?.isFormValid() ?? false;
  }

  getFormValue(): Partial<Task> {
    return this.form?.getFormValue();
  }

  closeDialog(task: Task): void {
    this.dialogRef.close(task);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
