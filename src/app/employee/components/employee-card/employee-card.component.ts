import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  standalone: false,
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})

export class EmployeeCardComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.employeeId = params['id'];
        this.initializeForm();

        if (this.employeeId) {
          this.loadEmployeeData(this.employeeId);
        }
      },
      error: (error) => console.error('Erreur lors de l\'obtention des paramètres :', error),
    });
  }

  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      poste: ['', Validators.required],
      department: ['', Validators.required],
      hireDate: ['', Validators.required],
    });
  }

  private loadEmployeeData(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données de l\'employé :', error);
      },
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid && this.employeeId) {
      const updatedEmployee = this.employeeForm.value;

      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
        next: () => {
          alert('Employé modifié avec succès !');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'employé :', error);
          alert('Erreur lors de la modification de l\'employé.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
