import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddButtonComponent, TableSearchFieldComponent } from './components';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MaterialModule } from './material.module';

const sharedComponents = [
  AddButtonComponent,
  TableSearchFieldComponent,
  LoadingSpinnerComponent,
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ...sharedComponents,
  ],
})
export class SharedModule {}
