import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
