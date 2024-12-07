import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverURL:string= "https://employeeangularserver-w5ye.onrender.com"
  constructor(private http:HttpClient) {}
  getEmployeeApi(){
    return this.http.get(`${this.serverURL}/allEmployees`)
  }
  getSingleEmployeeApi(id:string){
    return this.http.get(`${this.serverURL}/allEmployees/${id}`)
  }
  addEmployeeApi(reqbody:any){
    return this.http.post(`${this.serverURL}/allEmployees`,reqbody)
  }
  updateEmployeeApi(reqbody:any,id:string){
    return this.http.put(`${this.serverURL}/allEmployees/${id}`,reqbody)
  }
  deleteEmployeeApi(id:string){
    return this.http.delete(`${this.serverURL}/allEmployees/${id}`)
  }
}
