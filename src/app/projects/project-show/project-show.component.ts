import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services';
import { TaskFormDialogComponent } from 'src/app/tasks/components/task-form-dialog/task-form-dialog.component';
import { TaskTableComponent } from 'src/app/tasks/components/task-table/task-table.component';
import { CreateTaskDto } from 'src/app/tasks/dtos';
import { TaskService } from 'src/app/tasks/task.service';

import { Task } from '../../tasks/models/task.model';
import { Project } from '../models/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss'],
})
export class ProjectShowComponent implements OnInit {
  @ViewChild(TaskTableComponent) table!: TaskTableComponent;

  routeParam!: number;
  public project: Project = new Project();
  userId?: number;
  statusId?: number;
  priorityId?: number;
  task: Task = new Task();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();
  public addButtonLabel: string = 'Adicionar Tarefa';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private projectService: ProjectService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.routeParam = params['id'];
      this.task.project_id = this.routeParam;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getProjectById(this.routeParam);
      this.getCurrentUser();
    });
  }

  openCreateDialog() {
    console.log('openCreateDialog');
    const dialogRef: MatDialogRef<TaskFormDialogComponent> = this.dialog.open(
      TaskFormDialogComponent,
      {
        width: '720px',
        data: this.task,
      }
    );

    dialogRef.afterClosed().subscribe((result: CreateTaskDto) => {
      if (result?.name) {
        result.project_id = this.project.id;

        this.taskService.create(result).subscribe((data: Task) => {
          this.task = new Task();
          this.table.load();
        });
      }
      this.resetTask();
    });
  }

  private resetTask(): void {
    this.task = new Task();
    this.task.user_id = this.userId;
  }

  private getProjectById(id: number): void {
    this.loadingSubject.next(true);

    this.projectService.getById(id).subscribe((project: Project) => {
      this.project = project;
      this.loadingSubject.next(false);
    });
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.userId = user.id;
      this.task.user_id = this.userId;
    });
  }

  onStatusSelectionChange($event: MatSelectChange) {
    console.log($event);
    this.statusId = $event.value;
  }

  onStatusReset($event: boolean): void {
    console.log($event);
    this.statusId = undefined;
  }

  onPrioritySelectionChange($event: MatSelectChange) {
    console.log($event);
    this.priorityId = $event.value;
  }

  onPriorityReset($event: boolean): void {
    console.log($event);
    this.priorityId = undefined;
  }

  onUserSelectionChange($event: MatSelectChange) {
    console.log($event);
    this.userId = $event.value;
  }

  onUserReset($event: boolean): void {
    console.log($event);
    this.userId = undefined;
  }
}
