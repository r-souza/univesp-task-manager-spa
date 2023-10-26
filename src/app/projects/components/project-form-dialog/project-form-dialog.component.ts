import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Project } from '../../models/project.model';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.scss'],
})
export class ProjectFormDialogComponent implements AfterViewChecked {
  @ViewChild(ProjectFormComponent) form!: ProjectFormComponent;
  @Input() dialogAction: string = 'Adicionar';

  constructor(
    public dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private cdr: ChangeDetectorRef
  ) {
    if (data.id) {
      this.dialogAction = `Editar #${data.id}`;
    }
  }

  isFormValid(): boolean {
    return this.form?.isFormValid() ?? false;
  }

  getFormValue(): Partial<Project> {
    return this.form?.getFormValue();
  }

  closeDialog(project: Project): void {
    this.dialogRef.close(project);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
