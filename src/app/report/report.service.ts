import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, filter} from 'rxjs/operators';
import { _ } from 'underscore'
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(public http:HttpClient) { }
  url="https://api.mlab.com/api/1/databases/sachindaily/collections/subscription";
  productUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/product";
  pauseSubscriptionUrl = "https://api.mlab.com/api/1/databases/sachindaily/collections/pauseSubscription";
  apiKey="ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz"
  userUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/user"//?q={"active": true}&fo=true&apiKey=myAPIKey"
  getAllSubscriptions(sdate){
    console.log(sdate);
    return this.http.get(`${this.url}?q={startDate:{$lte:'${sdate}'},endDate:{$gte:'${sdate-1}'}}&s={${"wing"}:1}&apiKey=${this.apiKey}`)
    .pipe(map((res)=>{
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
  getAllPauseSubscriptions(selectedDate){
    return this.http.get(`${this.pauseSubscriptionUrl}?q={startDate:{$lte:'${selectedDate}'},endDate:{$gte:'${selectedDate-1}'}}&s={${"wing"}:1}&apiKey=${this.apiKey}`)
  }
  //this gives filtered subscriptions which are paused at given date
  filteredSubscriptions(selectedDate){
    var pausedSubscriptions;
    return this.getAllPauseSubscriptions(selectedDate)
          .toPromise().then((res)=>{
            pausedSubscriptions=res;
            console.log("pausedSubscription",pausedSubscriptions);
            return this.getAllSubscriptions(selectedDate).toPromise()
          }).then((allSubscriptions)=>{
            console.log("All Subscriptions",allSubscriptions)
            var x = allSubscriptions.filter((product)=>{
              console.log(_.where(pausedSubscriptions,{"mobileNumber":product.mobileNumber}).length==0)
                return (_.where(pausedSubscriptions,{"mobileNumber":product.mobileNumber}).length==0)
                
              })
              console.log(x);
            return Promise.resolve(x)
          })
    /*.pipe(
      map((pauseSubscription)=>{
        console.log("pauseSubscription",pauseSubscription);
        return this.getAllSubscriptions(selectedDate).pipe(map((getAllSubscriptions)=>{
          console.log("All Subscriptions",getAllSubscriptions)
        }))
      })
    );*/
  }
  subscriptionEvent = new EventEmitter();
}
