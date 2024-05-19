import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { PaginationOptionsDto } from '../../../shared/dtos/pagination-options.dto';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../project.service';
import { ProjectFormDialogComponent } from '../project-form-dialog/project-form-dialog.component';
import { TableSearchFieldComponent } from './../../../shared/components';
import { ProjectTableDataSource } from './projects-table-datasource';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
})
export class ProjectTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Project>;
  @ViewChild(TableSearchFieldComponent)
  tableSearchField!: TableSearchFieldComponent;
  dataSource: ProjectTableDataSource;
  pageSizeOptions = [1, 10, 25, 50, 100];
  private filter: string = '';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'estimated_duration',
    'actions',
  ];

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new ProjectTableDataSource(this.projectService);
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
    const paginationOptions: PaginationOptionsDto = {
      filter: this.filter,
      sortColumn: this.sort.active,
      sortOrder: this.sort.direction,
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
    };

    this.dataSource.load(paginationOptions);
  }

  search(filter: string): void {
    this.resetPaginator();
    this.filter = filter;
    this.load();
  }

  onRowDoubleClick(project: Project): void {
    this.open(project);
  }

  open(row: Project): void {
    this.router.navigate(['/projects', row.id]);
  }

  openEditDialog(project: Project): void {
    const dialogRef: MatDialogRef<ProjectFormDialogComponent> =
      this.dialog.open(ProjectFormDialogComponent, {
        width: '720px',
        data: project,
      });

    dialogRef.afterClosed().subscribe((result: Project): void => {
      if (result) {
        this.projectService
          .update(project.id.toString(), result)
          .subscribe((data: Project) => {
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
