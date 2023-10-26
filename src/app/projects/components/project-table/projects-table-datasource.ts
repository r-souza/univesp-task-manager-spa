import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';

import { PaginationDto, PaginationOptionsDto } from '../../../shared/dtos';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../project.service';

export class ProjectTableDataSource extends DataSource<Project> {
  private projectsSubject: BehaviorSubject<Project[]> = new BehaviorSubject<
    Project[]
  >([]);

  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  count: number = 0;

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private projectService: ProjectService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Project[]> {
    return this.projectsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.projectsSubject.complete();
    this.loadingSubject.complete();
  }

  load(options?: PaginationOptionsDto): void {
    this.loadingSubject.next(true);

    this.projectService
      .paginate(options)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((projects: PaginationDto<Project> | any): void => {
        this.count = projects.meta.total;
        this.projectsSubject.next(projects.data);
      });
  }

  getCount(): number {
    return this.count;
  }
}
