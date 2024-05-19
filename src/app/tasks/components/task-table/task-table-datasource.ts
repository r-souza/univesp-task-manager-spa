import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';

import { PaginationDto, PaginationOptionsDto } from '../../../shared/dtos';
import { Task } from '../../models/task.model';
import { TaskService } from '../../task.service';

export class TaskTableDataSource extends DataSource<Task> {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );

  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  count: number = 0;

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private taskService: TaskService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Task[]> {
    return this.tasksSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.tasksSubject.complete();
    this.loadingSubject.complete();
  }

  load(options?: PaginationOptionsDto): void {
    this.loadingSubject.next(true);

    this.taskService
      .paginate(options)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((tasks: PaginationDto<Task> | any): void => {
        this.count = tasks.meta.total;
        this.tasksSubject.next(tasks.data);
      });
  }

  getCount(): number {
    return this.count;
  }

  getTotalEffectiveDuration() {
    return this.tasksSubject.value.reduce(
      (acc, task) => acc + (task.effective_duration || 0),
      0
    );
  }
}
