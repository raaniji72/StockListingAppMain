import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService){
  }

  stocks: any[]=[];
  countryInput:string='';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  displayedStocks: any[] = [];
  pages: number[] = [];

  ngOnInit(){
    this.fetchStock()
  }

  fetchStock(){
    if(this.countryInput){
      this.authService.getStockByCountry(this.countryInput).subscribe(
        res=>{
          this.stocks=res;
          console.log(res)
        }
      )
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
 
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.stocks.length);
      this.displayedStocks = this.stocks.slice(startIndex, endIndex);
 
      this.pages = this.calculatePages();
    }
  }

  addFavorite(stock: any): void {
    this.authService.addFavorite(stock).subscribe(
      (response: any) => {
       // this.toastr.success('Added Successfully.', 'Success');
       alert("Successfully added !")
        console.log('Working Favorite', response);
        this.calculateTotalPages();
        this.changePage(this.currentPage);
      },
      (error) => {
        console.log('Error in favorite', error);
      }
    );
  }

  private calculatePages(): number[] {
    const visiblePages = 5; // You can adjust this value based on how many page numbers you want to show
    const startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + visiblePages - 1);
 
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.stocks.length / this.itemsPerPage);
  }

}
