import { Component } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  stockitems: any[]= [];
  temp :any[]=[];
 
 
  constructor( private authService: AuthService , private router: Router, private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
 
    this.loadWishlist();
 
  }
  deleteFav(stock: any): void {
    this.authService.delFavorites(stock).subscribe((data) => {
      this.temp = data;
      console.log("Deleted", this.temp);
      window.location.reload();
    }, error => {
      console.log("Delete failed", error);
    });
  }
 
 
  loadWishlist(): void {
    this.authService.getFavorites().subscribe((data) => {
      this.stockitems = data;
      console.log("Data Recived", this.stockitems);
    }, error => {
      console.log("DATA not recived", error);
    });
  }

}
