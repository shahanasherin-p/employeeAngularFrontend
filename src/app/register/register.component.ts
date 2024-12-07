import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  addForm:FormGroup
  constructor(private api:ApiService,private fb:FormBuilder,private router: Router){
    this.addForm=fb.group({
      name:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email:["",[Validators.required,Validators.email]],
      job_title:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      age:["",[Validators.required,Validators.pattern('^[0-9]+$')],],
      status:["",[Validators.required]] 
    })
  }
  addEmployee(){
    const { name, email, age, job_title, status } = this.addForm.value;
    console.log('Updated Data:', { name, email, age, job_title, status });
    if(this.addForm.valid){
      this.api.addEmployeeApi({name, email, age, job_title, status}).subscribe((res)=>{
        alert("Employee data added successfully")
        this.addForm.reset()
        this.router.navigateByUrl('/employees')
      })
    }else{
      alert("Invalid Form")
    }
  }
}
