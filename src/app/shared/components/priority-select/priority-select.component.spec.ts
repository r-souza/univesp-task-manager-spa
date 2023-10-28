import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriotitySelectComponent } from './priority-select.component';

describe('PriotitySelectComponent', () => {
  let component: PriotitySelectComponent;
  let fixture: ComponentFixture<PriotitySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriotitySelectComponent],
    });
    fixture = TestBed.createComponent(PriotitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
