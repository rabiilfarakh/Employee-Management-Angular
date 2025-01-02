import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private localStorageKey = 'employees';

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return of(employees);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    employees.push(employee);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    return of(employee);
  }

  updateEmployee(id: number, updatedEmployee: Employee): Observable<Employee> {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = employees.findIndex((e: Employee) => e.id === id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
      return of(updatedEmployee);
    }
    return throwError(() => new Error('Employee not found'));
  }

  deleteEmployee(id: number): Observable<boolean> {
    let employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    employees = employees.filter((e: Employee) => e.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    return of(true);
  }
}
