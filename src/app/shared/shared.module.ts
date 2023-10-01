import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LayoutModule
  ]
})
export class SharedModule { }
