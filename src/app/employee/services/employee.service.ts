import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
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

  getEmployeeById(id: number): Observable<Employee> {
    if (isPlatformBrowser(this.platformId)) {
      const employees: Employee[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
      const employee = employees.find((e) => e.id === Number(id));

      if (employee) {
        return of(employee);
      } else {
        return throwError(() => new Error('Employee not found'));
      }
    } else {
      return throwError(() => new Error('localStorage is not available'));
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
      console.error('localStorage is not available');
      return throwError(() => new Error('localStorage is not available'));
    }
  }

  updateEmployee(id: number ,employee: Employee): Observable<Employee> {
    console.log(id);
    return this.getEmployees().pipe(
      map((employees: Employee[]) => {
        const index = employees.findIndex((e) => e.id === Number(id));
        console.log(index);

        if (index === -1) {
          console.log('Employees');
          throw new Error('Employee not found');
        }

        employees[index] = { ...employees[index], ...employee };
      
        localStorage.setItem(this.localStorageKey, JSON.stringify(employees));

        return employees[index];
      })
    );
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
