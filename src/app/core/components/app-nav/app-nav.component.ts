import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../services';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent {
  appTitle: string = 'Gerenciador de Tarefas';
  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.getCurrentUser();
  }
}
