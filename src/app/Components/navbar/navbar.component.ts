import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(public authService:AuthService, private route:Router){

}

  logOut(){
    this.authService.removeToken();
    this.route.navigateByUrl('/login');
  }
}
