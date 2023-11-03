import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-table-search-field',
  templateUrl: './table-search-field.component.html',
  styleUrls: ['./table-search-field.component.scss'],
})
export class TableSearchFieldComponent implements AfterViewInit {
  @ViewChild('input')
  input!: ElementRef;
  @Input() placeholder: string = 'Search';
  @Input() hint: string = 'Type here to search for a record';
  @Input() debounceTime: number = 300;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => {
          this.search.emit(this.input.nativeElement.value);
        })
      )
      .subscribe(() => {
        console.log('TableSearchFieldComponent.search.emit() - subscribe');
      });
  }

  cleanSearch() {
    this.input.nativeElement.value = '';
  }
}
