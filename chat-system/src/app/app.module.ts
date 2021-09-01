import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { GroupComponent } from './group/group.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomComponent,
    DashboardComponent,
    UsersComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
