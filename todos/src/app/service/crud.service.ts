import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable, pipe,throwError} from 'rxjs';
import{Task} from '../model/task';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //serviceURL : string;
  task:any;
  constructor(private http: HttpClient) { 
    
  }
  serviceURL=" http://localhost:8080/tasks";

  handleError(error:any){
    return throwError(error.message||"server error")
  }

  //AddTask
  addTask(task:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                    .set('Accept','application/json')
    console.log(task,"task added");
    return this.http.post<Task>(`${this.serviceURL}`,task,{headers:headers}).pipe(catchError(this.handleError));
  }

  //getSingle
  getSingle(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                        .set('Accept','application/json')
    return this.http.get(`${this.serviceURL}/${id}`,{headers:headers}).pipe(catchError(this.handleError));
  }
  

  //getAll
  getAllTask():Observable<any>{
    console.log("taskS LOADED");
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                    .set('Accept','application/json')
    return this.http.get(`${this.serviceURL}`,{headers:headers}).pipe(catchError(this.handleError));
  }

  deleteTask(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                    .set('Accept','application/json');
    console.log(id,"taskS deleted in service");
    let ids=id;
    return this.http.delete(`${this.serviceURL}/${ids}`,{headers:headers}).pipe(catchError(this.handleError));
  }


  editTask(id:number,value:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                    .set('Accept','application/json')
    let ids=id;
    return this.http.put(`${this.serviceURL}/${ids}`,value,{headers:headers}).pipe(catchError(this.handleError));
  }
}
