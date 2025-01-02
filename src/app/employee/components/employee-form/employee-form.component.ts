import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  standalone: false
})
export class EmployeeFormComponent {

  employeeForm!: FormGroup;

  constructor(private employeeService : EmployeeService, private fb : FormBuilder) {
      
  };

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      this.employeeService.addEmployee(employee).subscribe(newEmployee => {
      });
      this.employeeForm.reset();
    }else
    {
      alert('Please fill all the required fields');
    }
  }

}
