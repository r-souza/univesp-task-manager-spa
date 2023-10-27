import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ProjectFormDialogComponent } from './components/project-form-dialog/project-form-dialog.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectShowComponent } from './project-show/project-show.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectTableComponent, ProjectFormDialogComponent, ProjectFormComponent, ProjectShowComponent],
  imports: [CommonModule, ProjectsRoutingModule, MaterialModule, SharedModule],
})
export class ProjectsModule {}
