import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, AfterViewInit {
  @Input() data: Task = new Task();
  taskFormGroup!: FormGroup;

  @Output() submitedEvent: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.taskFormGroup = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description],
      effective_duration: [this.data.effective_duration, Validators.min(0)],
      priority_id: [this.data.priority_id],
      status_id: [this.data.status_id],
      user_id: [this.data.user_id],
    });
  }

  ngAfterViewInit() {}

  isFormValid(): boolean {
    return this.taskFormGroup.valid;
  }

  getFormValue(): Partial<Task> {
    return this.taskFormGroup.value;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitedEvent.emit(this.taskFormGroup.value);
    }
  }

  userSelected($event: MatSelectChange) {
    this.taskFormGroup.controls['user_id'].setValue($event.value);
  }

  prioritySelected($event: MatSelectChange) {
    this.taskFormGroup.controls['priority_id'].setValue($event.value);
  }

  statusSelected($event: MatSelectChange) {
    this.taskFormGroup.controls['status_id'].setValue($event.value);
  }
}
