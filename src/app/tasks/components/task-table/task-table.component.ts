import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { Task } from '../../models/task.model';
import { TaskService } from '../../task.service';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { TableSearchFieldComponent } from './../../../shared/components';
import { TaskTableDataSource } from './task-table-datasource';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements AfterViewInit {
  @Input() projectId!: number;
  @Input() userId?: number;
  @Input() statusId?: number;
  @Input() priorityId?: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild(TableSearchFieldComponent)
  tableSearchField!: TableSearchFieldComponent;
  dataSource: TaskTableDataSource;
  pageSizeOptions = [1, 10, 25, 50, 100];
  private filter: string = '';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new TaskTableDataSource(this.taskService);
    this.dataSource.load();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    /**
     *  Reset paginator after sort
     */
    this.sort.sortChange.subscribe(() => this.resetPaginator());

    /**
     * Subscribe for sort and paginator changes
     */
    this.paginator.page.pipe(tap(() => this.load())).subscribe();
    this.sort.sortChange.pipe(tap(() => this.load())).subscribe();
  }

  /**
   * Load data from datasource
   */
  load(): void {
    const paginationOptions = {
      filter: this.filter,
      sortColumn: this.sort.active,
      sortOrder: this.sort.direction,
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
      projectId: this.projectId || null,
      userId: this.userId || null,
      statusId: this.statusId || null,
      priorityId: this.priorityId || null,
    };

    this.dataSource.load(paginationOptions);
  }

  search(filter: string): void {
    this.resetPaginator();
    this.filter = filter;
    this.load();
  }

  onRowDoubleClick(task: Task): void {
    this.open(task);
  }

  open(row: Task): void {
    this.router.navigate(['/tasks', row.id]);
  }

  openEditDialog(task: Task): void {
    const dialogRef: MatDialogRef<TaskFormDialogComponent> = this.dialog.open(
      TaskFormDialogComponent,
      {
        width: '720px',
        data: task,
      }
    );
    dialogRef.afterClosed().subscribe((result: Task): void => {
      if (result) {
        this.taskService
          .update(task.id.toString(), result)
          .subscribe((data: Task) => {
            /**
             * All Good, load data again
             */
            this.load();
          });
      }
    });
  }

  private resetPaginator(): void {
    this.paginator.pageIndex = 0;
  }
}
