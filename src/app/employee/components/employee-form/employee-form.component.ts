import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  standalone:false,
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',

  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email : ['', Validators.email],
      poste: ['', Validators.required],
      department: ['', Validators.required],
      hireDate: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
  
      this.employeeService.addEmployee(employee).subscribe({
        next: (newEmployee) => {
          console.log('Employee added successfully:', newEmployee);
          this.employeeForm.reset(); 
        },
        error: (error) => {
          console.error('Error while adding employee:', error);
          alert('An error occurred while adding the employee. Please try again.');
        },
        complete: () => {
          console.log('Employee addition process completed');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
}
