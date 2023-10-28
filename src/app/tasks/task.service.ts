import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiService } from '../core/services';
import { PaginationDto } from '../shared/dtos';
import { PaginationOptionsDto } from './dtos';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskDto } from './dtos/get-task.dto';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private resourceUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private apiService: ApiService) {}

  paginate(options?: PaginationOptionsDto): Observable<PaginationDto<Task>> {
    let params: HttpParams = new HttpParams()
      .set('filter', options?.filter ?? '')
      .set('sortColumn', options?.sortColumn ?? 'id')
      .set('sortOrder', options?.sortOrder ?? 'asc')
      .set('page', options?.page?.toString() ?? '1')
      .set('per_page', options?.limit?.toString() ?? '10')
      .set('project_id', options?.projectId?.toString() ?? '')
      .set('priority_id', options?.priorityId?.toString() ?? '')
      .set('status_id', options?.statusId?.toString() ?? '')
      .set('user_id', options?.userId?.toString() ?? '');

    return this.apiService.getRequest<PaginationDto<Task>>(
      this.resourceUrl,
      params
    );
  }

  getById(id: number): Observable<Task> {
    return this.apiService
      .getById<GetTaskDto>(this.resourceUrl, id)
      .pipe(map((response: GetTaskDto): Task => new Task(response.data)));
  }

  create(resource: CreateTaskDto): Observable<Task> {
    return this.apiService.postRequest<Task>(this.getResourceUrl(), resource);
  }

  update(id: string, resource: Partial<CreateTaskDto>): Observable<Task> {
    const updateUrl: string = `${this.getResourceUrl()}/${id}`;
    console.log(updateUrl);

    return this.apiService.patchRequest(updateUrl, resource);
  }

  getResourceUrl(): string {
    return this.resourceUrl;
  }
}
