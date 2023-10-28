import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectFormDialogComponent } from 'src/app/projects/components/project-form-dialog/project-form-dialog.component';
import { Project } from 'src/app/projects/models/project.model';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
})
export class TaskFormDialogComponent {
  @Input() dialogAction: string = 'Adicionar';
  // @ViewChild(TaskFormComponent) form!: TaskFormComponent;

  constructor(
    public dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private cdr: ChangeDetectorRef
  ) {
    if (data.id) {
      this.dialogAction = `Editar #${data.id}`;
    }
  }

  // isFormValid(): boolean {
  //   return this.form?.isFormValid() ?? false;
  // }

  // getFormValue(): Partial<Project> {
  //   return this.form?.getFormValue();
  // }

  closeDialog(project: Project): void {
    this.dialogRef.close(project);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
