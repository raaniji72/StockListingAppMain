import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { PageNotFountComponent } from './Components/page-not-fount/page-not-fount.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { WishListComponent } from './Components/wish-list/wish-list.component';


const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:RegistrationComponent
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },

  {
    path: 'wishlist',
     component: WishListComponent,
     canActivate:[AuthGuard]
    
  },

  {
    path:'**',
    component:PageNotFountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
