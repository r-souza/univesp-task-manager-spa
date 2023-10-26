import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  @Input() loading$: Observable<boolean> = of(false);
  constructor() {}
}
