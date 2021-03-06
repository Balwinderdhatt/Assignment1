import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GrouphomeComponent } from './grouphome/grouphome.component';
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'room', component:RoomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dash', component:DashboardComponent},
  {path: 'grouphome/:groups', component:GrouphomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
