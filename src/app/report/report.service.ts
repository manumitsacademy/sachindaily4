import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, filter} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(public http:HttpClient) { }
  url="https://api.mlab.com/api/1/databases/sachindaily/collections/subscription";
  productUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/product";
  pauseDeliveryUrl = "https://api.mlab.com/api/1/databases/sachindaily/collections/pauseDelivery";
  apiKey="ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz"
  userUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/user"//?q={"active": true}&fo=true&apiKey=myAPIKey"
  getAllSubscriptions(sdate){
    console.log(sdate);
    return this.http.get(`${this.url}?q={startDate:{$lte:'${sdate}'},endDate:{$gte:'${sdate}'}}&s={${"wing"}:1}&apiKey=${this.apiKey}`).pipe(map((res)=>{
      return Object.keys(res).map((i)=>{return res[i]});      
    }))
  }
  getAllUsers(){
    return this.http.get(`${this.userUrl}?apiKey=${this.apiKey}`).pipe(map((res)=>{
      return Object.keys(res).map((i)=>{return res[i]});
    }))
  }
  getProductDetailsById(id){
    return this.http.get(`${this.productUrl}/${id}?apiKey=${this.apiKey}`).pipe(map((res)=>{
      return res['productName'].toString();
    }))
  }
  subscriptionEvent = new EventEmitter();
}
