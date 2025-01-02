import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeFormComponent, EmployeeCardComponent],
  imports: [CommonModule, EmployeeRoutingModule, ReactiveFormsModule],
})
export class EmployeeModule {}
