import { LoginComponent } from './components/authr/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './components/otp/otp.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [{
  path:'',
  component:LoginComponent
}, {
  path:'verfiy',
  component:OtpComponent
},{
    path:'dashboard',
    component:SidebarComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
