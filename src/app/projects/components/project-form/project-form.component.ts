import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  @Input() data: Project = new Project();
  projectFormGroup!: FormGroup;

  @Output() submitedEvent: EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private formBuilder: FormBuilder) {
    console.log('ProjectFormComponent Constructor');
  }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description],
      estimated_duration: [this.data.estimated_duration, Validators.min(0)],
    });
  }

  isFormValid(): boolean {
    return this.projectFormGroup.valid;
  }

  getFormValue(): Partial<Project> {
    return this.projectFormGroup.value;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitedEvent.emit(this.projectFormGroup.value);
    }
  }
}
