import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MatProgressSpinnerModule],
        declarations: [LoadingSpinnerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the spinner when loading$ is true', () => {
    component.loading$ = of(true);
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should not render the spinner when loading$ is false', () => {
    component.loading$ = of(false);
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeFalsy();
  });

  it('should have a default value for loading$', () => {
    expect(component.loading$).toBeDefined();
  });
});
