import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee/components/employee-form/employee-form.component';

import { EmployeeService } from './employee/services/employee.service';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeFormComponent },
  { path: ':id', component: EmployeeFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],

  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
