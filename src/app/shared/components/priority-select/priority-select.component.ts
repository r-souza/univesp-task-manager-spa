import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

import { GetResourcesDto } from '../../dtos';
import { Priority } from '../../models';

@Component({
  selector: 'app-priority-select',
  templateUrl: './priority-select.component.html',
  styleUrls: ['./priority-select.component.scss'],
})
export class PrioritySelectComponent implements OnInit {
  private resourceUrl = `${environment.apiBaseUrl}/priorities`;

  @Input() value!: number | undefined;
  @Input() required = false;
  @Input() filtering = false;

  @Output() outputOnChange: EventEmitter<boolean> = new EventEmitter(false);
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();
  @Output() resetSelect: EventEmitter<boolean> = new EventEmitter(false);

  priorities: Priority[] = [];

  selectPriorityFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.selectPriorityFormGroup = this.formBuilder.group({
      name: [this.value, Validators.required],
      description: [''],
    });

    this.getPriorities();
  }

  onSelectionChange(event: { value: MatSelectChange }): void {
    this.selectionChange.emit(event.value);
  }

  reset(): void {
    this.value = undefined;
    this.selectPriorityFormGroup.reset();
    this.resetSelect.emit(true);
  }

  isFormValid(): boolean {
    return this.selectPriorityFormGroup.valid;
  }

  private getPriorities() {
    this.apiService
      .getRequest<GetResourcesDto<Priority>>(this.resourceUrl)
      .subscribe({
        next: (data: GetResourcesDto<Priority>) => {
          this.priorities = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
