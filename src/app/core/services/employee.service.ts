import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private localStorageKey = 'employees';

  constructor() {}

  getEmployees(): Observable<any[]> {
    const employees = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return of(employees);
  }

  addEmployee(employee: any): Observable<any> {
    const employees = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    employees.push(employee);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    return of(employee);
  }

  updateEmployee(id: number, updatedEmployee: any): Observable<any> {
    const employees = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = employees.findIndex((e: any) => e.id === id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
      return of(updatedEmployee);
    }
    return throwError(() => new Error('Employee not found'));
  }

  deleteEmployee(id: number): Observable<any> {
    let employees = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    employees = employees.filter((e: any) => e.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    return of(true);
  }
}
