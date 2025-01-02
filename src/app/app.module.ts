import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditeEmployeeComponent } from './components/edite-employee/edite-employee.component';

import { CanActivateGuard } from './guards/canActivate.guard';
import { CanActivateChildGuard } from './guards/canActivateChild.guard';
import { CanDeactivateGuard } from './guards/canDeactivate.guard';
import { CanLoadGuard } from './guards/canLoad.guard';

const routes: Routes = [
  { 
    path: '', 
    component: EmployeeComponent, 
    canActivateChild: [CanActivateChildGuard], 
    children: [
      { path: 'addEmployee', component: AddEmployeeComponent },
    ]
  },


  { path: 'editeEmployee', 
    component: EditeEmployeeComponent,
    canActivate: [CanActivateGuard]}, 
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
    AddEmployeeComponent,
    EditeEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    CanActivateGuard,
    CanActivateChildGuard,
    CanDeactivateGuard,
    CanLoadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
