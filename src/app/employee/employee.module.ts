import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeFormComponent, EmployeeCardComponent],
  imports: [CommonModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
