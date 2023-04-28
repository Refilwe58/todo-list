import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import{EditComponent} from './component/edit/edit.component';

const routes: Routes = [
  {path:'task',component:DashboardComponent},
  //{path:'task',component:DashboardComponent},
  {
  path:'edit/:id',component:EditComponent},
  {path:'**',redirectTo :'task'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
