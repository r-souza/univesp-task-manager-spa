import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

import { GetResourcesDto } from '../../dtos';
import { Status } from '../../models';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  private resourceUrl = `${environment.apiBaseUrl}/status`;

  @Input() value!: number | undefined;
  @Input() required = false;
  @Input() filtering = false;
  @Input() hint: string = 'Selecione um status';
  @Input() filteringHint: string = 'Pressione ESC para limpar';

  @Output() outputOnChange: EventEmitter<boolean> = new EventEmitter(false);
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();
  @Output() resetSelect: EventEmitter<boolean> = new EventEmitter(false);

  statuses: Status[] = [];

  selectStatusFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.selectStatusFormGroup = this.formBuilder.group({
      name: [this.value],
    });

    this.getStatuses();
  }

  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event);
  }

  reset(): void {
    this.value = undefined;
    this.selectStatusFormGroup.reset();
    this.resetSelect.emit(true);
  }

  isFormValid(): boolean {
    return this.selectStatusFormGroup.valid;
  }

  private getStatuses() {
    this.apiService
      .getRequest<GetResourcesDto<Status>>(this.resourceUrl)
      .subscribe({
        next: (data: GetResourcesDto<Status>) => {
          this.statuses = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
