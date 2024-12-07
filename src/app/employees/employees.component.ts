import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  allEmployee:any=[]
  dummyAllEmployee:any=[]
  employee:any={}
  updateForm:FormGroup
  addForm:FormGroup
  
  constructor(private api:ApiService,private fb:FormBuilder){
  this.updateForm=fb.group({
    name:["",[Validators.pattern('[a-zA-Z ]*')]],
    email:["",[Validators.email]],
    job_title:["",[Validators.pattern('[a-zA-Z ]*')]],
    age:["",[Validators.pattern('^[0-9]+$')]],
    status:[""] 
  })
  this.addForm=fb.group({
    name:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:["",[Validators.required,Validators.email]],
    job_title:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    age:["",[Validators.required,Validators.pattern('^[0-9]+$')]],
    status:["",[Validators.required]] 
  })
  }
  ngOnInit(){
    this.getAllEmployee()
  }
  getAllEmployee(){
    this.api.getEmployeeApi().subscribe((res)=>{
      this.allEmployee=res
      this.dummyAllEmployee=res
      console.log(this.allEmployee);
    })
  }
  getEmployee(id:string){
    this.api.getSingleEmployeeApi(id).subscribe((res)=>{
      this.employee=res
      console.log(this.employee);
        // Patch form values with employee data
        this.updateForm.patchValue({
          name: this.employee.name,
          email: this.employee.email,
          age: this.employee.age,
          job_title: this.employee.job_title,
          status: this.employee.status
        });
    
    })
    
  }
  updateEmployee(id: string) {
    if (this.updateForm.valid) {
      const { name, email, age, job_title, status } = this.updateForm.value;
      
      console.log('Updated Data:', { name, email, age, job_title, status });
  
      this.api.updateEmployeeApi({ name, email, age, job_title, status }, id)
        .subscribe({
          next: (res) => {
            console.log(res);  
            alert("Employee details updated successfully!");
            this.getAllEmployee();  
          },
          error: (err) => {
            console.error( err);  
            alert("Failed to update employee. Please try again.");
          }
        });
    } else {
      alert("Please fill out all required fields correctly.");
    }
  }
  addEmployee(){
    const { name, email, age, job_title, status } = this.addForm.value;
    console.log('Updated Data:', { name, email, age, job_title, status });
    if(this.addForm.valid){
      this.api.addEmployeeApi({name, email, age, job_title, status}).subscribe((res)=>{
        console.log("success!!");
        this.addForm.reset()
        this.getAllEmployee()
      })
    }else{
      alert("Invalid Form")
    }
  }
  
  deleteEmployee(id:string){
    if(id){
      this.api.deleteEmployeeApi(id).subscribe((res)=>{
        console.log("employee deleted");
        alert("employee deleted")
        this.getAllEmployee()
      })
    }
  }
  
  filterEmployee(value:string){
    this.allEmployee=this.dummyAllEmployee.filter((item:any)=>item["status"]==value)
  }
  
}
