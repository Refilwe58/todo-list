import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService} from 'src/app/service/crud.service';
import {FormGroup,FormControl,Validators,ReactiveFormsModule,FormBuilder} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task= new Task();
  taskArr:Task[]=[];
 taskForm!:FormGroup;
  tasks:any;
  errMsg:any;


  

  constructor(private crudService : CrudService,private router:Router,private fb:FormBuilder,route:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.taskObj=new Task();
    this.taskArr=[];
    this.getAllTask();
    this.initForm();
  }
  

  //initialize formgroup
  initForm(){
    this.taskForm= this.fb.group({
      'task_title': new FormControl('',[Validators.required]),
      'task_description':new FormControl('',[Validators.required])
      })
  }


  ///get  all tasks
  getAllTask(): void{
    this.crudService.getAllTask().subscribe((res)=>{ 
      this.tasks=res;
      console.log(res);
    },err=>{
    
      alert("Unable to get the tasks")
    })
  }


  //add tasks
  addTask(){
    console.log(this.taskForm.value);
    
   if(this.taskForm.valid){
    console.log(this.taskForm.value);
    this.crudService.addTask(this.taskForm.value).subscribe((res)=>{
      this.ngOnInit();
      this.taskForm.reset();
      console.log(res);
      this.getAllTask();
      
    },err=>{
      console.log(err)
    })
    }else{
      this.errMsg=("All fields required!");
    }
    this.getAllTask();
    this.taskForm.reset();
  }


  /*editTask(id:number,value:any){
    this.taskObj.task_title=this.editTaskTitle;
    this.taskObj.task_description=this.editTaskDesc;
    //if(this.formGroup.valid){
    this.crudService.editTask(id,this.taskObj).subscribe(res=>{
    this.ngOnInit();
    },err=>{
      alert("Failed to update  task")
    })
    //}
  }*/

  deleteTask(id:any){
    
    this.crudService.deleteTask(id).subscribe((res)=>{
    this.ngOnInit();
    console.log(res,"task deleted");
     this.getAllTask();
   
    })
   this.getAllTask();
  }

  editing(id:number){
   this.router.navigate(['edit',id]);
    

  }
}
 