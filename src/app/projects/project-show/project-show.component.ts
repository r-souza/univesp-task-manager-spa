import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Project } from '../models/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss'],
})
export class ProjectShowComponent implements OnInit {
  routeParam!: number;
  public project: Project = new Project();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();
  public addButtonLabel: string = 'Adicionar Tarefa';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.routeParam = params['id'];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getProjectById(this.routeParam);
    });
  }

  openCreateDialog() {
    throw new Error('Method not implemented.');
  }

  private getProjectById(id: number): void {
    this.loadingSubject.next(true);

    this.projectService.getById(id).subscribe((project: Project) => {
      this.project = project;
      this.loadingSubject.next(false);
    });
  }
}
