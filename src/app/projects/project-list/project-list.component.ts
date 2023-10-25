import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  addButtonLabel = 'Adicionar Projeto';

  openCreateDialog() {
    // throw new Error('Method not implemented.');
    console.log('openCreateDialog');
  }
}
