import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiService } from '../core/services';
import { PaginationDto, PaginationOptionsDto } from '../shared/dtos';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private resourceUrl = `${environment.apiBaseUrl}/projects`;

  constructor(private apiService: ApiService) {}

  paginate(options?: PaginationOptionsDto): Observable<PaginationDto<Project>> {
    const params: HttpParams = new HttpParams()
      .set('filter', options?.filter ?? '')
      .set('sortColumn', options?.sortColumn ?? 'id')
      .set('sortOrder', options?.sortOrder ?? 'asc')
      .set('page', options?.page?.toString() ?? '1')
      .set('per_page', options?.limit?.toString() ?? '10');

    return this.apiService.getRequest<PaginationDto<Project>>(
      this.resourceUrl,
      params
    );
  }

  create(resource: CreateProjectDto): Observable<Project> {
    return this.apiService.postRequest<Project>(
      this.getResourceUrl(),
      resource
    );
  }

  update(id: string, resource: Partial<CreateProjectDto>): Observable<Project> {
    const updateUrl: string = `${this.getResourceUrl()}/${id}`;
    console.log(updateUrl);

    return this.apiService.patchRequest(updateUrl, resource);
  }

  getResourceUrl(): string {
    return this.resourceUrl;
  }
}
