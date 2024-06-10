import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../model/user-info.model';
import { Observable } from 'rxjs';
import { LoginInfo } from '../model/login-info.model';
import { test } from 'node:test';
import { text } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpcli:HttpClient) { }

  registerUser(userInfo:any) : Observable<UserInfo>{
      return this.httpcli.post("http://3.80.203.219:8080/api/users/register",userInfo);
  }


  loginUser(loginInfo: any) :Observable<any>{
      return this.httpcli.post("http://3.80.203.219:8081/api/v1.0/authentication/login",loginInfo)
  }

  isLoggedIn() :boolean
  {
    return sessionStorage.getItem("myToken") ? true : false;
  }

  removeToken(){
    //sessionStorage.clear
    sessionStorage.removeItem("myToken");
    sessionStorage.removeItem('username');
  }


   
  serviceUrlStock: string ="http://54.81.225.13:8082/api/v1.0/stocks"
 
 
  removeFromFavList(id: any): Observable<any> {
    return this.httpcli.delete<any>("http://52.90.228.5:8083/wishlist/delete/"+id);
  }
  viewAllStock(): Observable<any> {
    return this.httpcli.get<any>("http://52.90.228.5:8083/wishlist/view");
  }
  getStocks(): Observable<any> {
    return this.httpcli.get<any>("54.81.225.13:8082/api/v1.0/stocks/country");
  }

  getStockByCountry(country : String) : Observable<any>{
       return this.httpcli.get("http://54.81.225.13:8082/api/v1.0/stocks/country/" + country);
  }

   
  delFavorites(stock: any): Observable<any> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('myToken')}`
    };
    const favId = stock.favId;
    var uri = "http://52.90.228.5:8083/wishlist/delete/" + favId;
    return this.httpcli.delete(uri, {headers});
  }

  getFavorites(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('myToken')}`
    };
    const username = sessionStorage.getItem('username');
    return this.httpcli.get(`http://52.90.228.5:8083/wishlist/getByUsername/${username}`, {headers});
  }

  addFavorite(stock: any): Observable<any> {
    const headers = {
          Authorization: `Bearer ${sessionStorage.getItem('myToken')}`
        };
    const username = sessionStorage.getItem('username');
    const requestBody = {
                          username: username,
                          symbol: stock.symbol,
                          name: stock.name,
                          currency: stock.currency,
                          country: stock.country,
                          exchange: stock.exchange,
                          type: stock.type,
                          mincCode: stock.micCode || null,
    };
    console.log("Request Body", requestBody);
    return this.httpcli.post(`http://52.90.228.5:8083/wishlist/add`, requestBody, {headers});
  }

}
