import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ProjectFormDialogComponent } from '../components/project-form-dialog/project-form-dialog.component';
import { ProjectTableComponent } from '../components/project-table/project-table.component';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { Project } from '../models/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  @ViewChild(ProjectTableComponent) table!: ProjectTableComponent;

  addButtonLabel = 'Adicionar Projeto';
  project: Project = new Project();

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  openCreateDialog() {
    console.log('openCreateDialog');
    const dialogRef: MatDialogRef<ProjectFormDialogComponent> =
      this.dialog.open(ProjectFormDialogComponent, {
        width: '720px',
        // height: '480px',
        data: this.project,
      });

    dialogRef.afterClosed().subscribe((result: CreateProjectDto) => {
      if (result?.name) {
        this.projectService.create(result).subscribe((data: Project) => {
          this.project = new Project();
          this.table.load();
        });
      }
    });
  }
}
