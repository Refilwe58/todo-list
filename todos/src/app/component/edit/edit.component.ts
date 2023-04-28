import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task';

import {FormGroup,FormControl,Validators,ReactiveFormsModule,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id :any;
task:any;
  taskObj: Task = new Task;
editGroup!:FormGroup; 
  constructor(private route:ActivatedRoute,private crudService : CrudService, private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.taskObj= new Task();
    this.initForm();
    this.id=this.route.snapshot.params['id'];
    console.log(this.id);
    this.crudService.getSingle(this.id).subscribe(res=>{
      console.log(res,"response")
      this.editGroup.patchValue({
        task_title:res[0].task_title,
        task_description : res[0].task_description 
      })
      this.task=res;
    })
  }

  initForm(){
    this.editGroup=this.fb.group({
      task_title: new FormControl('',Validators.required),
      task_description: new FormControl('',Validators.required)
      })
    }

    submit(){
      if( this.editGroup.valid){
      this.crudService.editTask(this.id,this.editGroup.value).subscribe(res=>{
        //this.taskObj=new Task();
        console.log(res,"successfull")

        this.gotoTask();
       
      })
    }else{
      console.log(this.editGroup.value)
      alert("enter fields");
    }
    this.gotoTask();
    }

    gotoTask(){
      this.router.navigate(['task']);
    }


}
