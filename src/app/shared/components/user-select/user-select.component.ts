import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

import { GetResourcesDto } from '../../dtos';
import { User } from '../../models';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
})
export class UserSelectComponent implements OnInit {
  private resourceUrl = `${environment.apiBaseUrl}/users`;

  @Input() value!: number | undefined;
  @Input() required = false;
  @Input() filtering = false;
  @Input() hint: string = 'Selecione um usuário';
  @Input() filteringHint: string = 'Pressione ESC para limpar';

  @Output() outputOnChange: EventEmitter<boolean> = new EventEmitter(false);
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();
  @Output() resetSelect: EventEmitter<boolean> = new EventEmitter(false);

  users: User[] = [];

  selectUserFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.selectUserFormGroup = this.formBuilder.group({
      name: [this.value],
    });

    this.getUsers();
  }

  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event);
  }

  reset(): void {
    this.value = undefined;
    this.selectUserFormGroup.reset();
    this.resetSelect.emit(true);
  }

  isFormValid(): boolean {
    return this.selectUserFormGroup.valid;
  }

  private getUsers() {
    this.apiService
      .getRequest<GetResourcesDto<User>>(this.resourceUrl)
      .subscribe({
        next: (data: GetResourcesDto<User>) => {
          this.users = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
