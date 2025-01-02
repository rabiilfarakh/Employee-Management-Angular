import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { isPlatformBrowser } from '@angular/common'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private localStorageKey = 'employees';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getEmployees(): Observable<Employee[]> {
    if (isPlatformBrowser(this.platformId)) {
      const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
      return of(employees);
    } else {
      return of([]);
    }
  }

  addEmployee(employee: Employee): Observable<Employee> {
    if (isPlatformBrowser(this.platformId)) {
      const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
      const id = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      const newEmployee = { ...employee, id };

      employees.push(newEmployee);
      localStorage.setItem(this.localStorageKey, JSON.stringify(employees));

      return of(newEmployee);
    } else {
      return throwError(() => new Error('localStorage is not available'));
    }
  }

  updateEmployee(id: number, updatedEmployee: Employee): Observable<Employee> {
    if (isPlatformBrowser(this.platformId)) {
      const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
      const index = employees.findIndex((e: Employee) => e.id === id);
      if (index !== -1) {
        employees[index] = updatedEmployee;
        localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
        return of(updatedEmployee);
      }
      return throwError(() => new Error('Employee not found'));
    } else {
      return throwError(() => new Error('localStorage is not available'));
    }
  }

  deleteEmployee(id: number): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      let employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
      employees = employees.filter((e: Employee) => e.id !== id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
      return of(true);
    } else {
      return throwError(() => new Error('localStorage is not available'));
    }
  }
}
