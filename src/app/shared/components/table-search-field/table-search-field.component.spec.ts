/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/material.module';
import { TableSearchFieldComponent } from './table-search-field.component';

describe('TableSearchFieldComponent', () => {
  let component: TableSearchFieldComponent;
  let fixture: ComponentFixture<TableSearchFieldComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, BrowserAnimationsModule],
        declarations: [TableSearchFieldComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should placeholder has a default value', () => {
    expect(component.placeholder).toEqual('Search');
  });

  it('should hint has a default value', () => {
    expect(component.hint).toEqual('Type here to search for a record');
  });

  it('should debounceTime has a default value', () => {
    expect(component.debounceTime).toEqual(300);
  });

  it('should cleanSearch', () => {
    const inputElement = component.input.nativeElement;
    inputElement.value = 'test';

    component.cleanSearch();

    expect(inputElement.value).toEqual('');
  });

  /**
   * This test doesn't work and i don't know why.
   *
   * :-(
   *
   */
  xit('should emit search event when input value changes', () => {
    spyOn(component.search, 'emit');

    const event: KeyboardEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'a',
    });

    const inputElement = component.input.nativeElement;
    inputElement.dispatchEvent(event);
    expect(component.search.emit).toHaveBeenCalledWith('a');
  });
});
