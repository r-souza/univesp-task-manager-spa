import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskFormDialogComponent } from './components/task-form-dialog/task-form-dialog.component';

@NgModule({
  declarations: [TaskTableComponent, TaskFormDialogComponent],
  imports: [CommonModule, TasksRoutingModule, MaterialModule, SharedModule],
  exports: [TaskTableComponent],
})
export class TasksModule {}
