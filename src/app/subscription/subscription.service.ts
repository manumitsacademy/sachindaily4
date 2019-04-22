import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { _ }from 'underscore'
import { ProductService } from '../products/product.service';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  pauseDeliveryUrl = "http://isolveit.in/sachinDaily/modifySubscriptions.php";
  subscriptionUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/subscription";
  apiKey="apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz";
  pauseSubscriptionUrl = "https://api.mlab.com/api/1/databases/sachindaily/collections/pauseSubscription";
  constructor(public http:HttpClient,public pS:ProductService) { }
  getSubscribedProducts(mobileNumber){
    var today = Math.floor((new Date().getTime())/1000)
    return this.http
    .get(`${this.subscriptionUrl}?q={"mobileNumber":'${mobileNumber}',"endDate":{$gte:"${today}"}}&${this.apiKey}`)               
     .pipe(
       map((subscriptions)=>{
         console.log(subscriptions)
        var products =_.indexBy(subscriptions,"productId");
        var keys = _.keys(products)       
        return keys
       }),
       map((keys)=>{
         return this.pS.getProductDetailsByProductIds(keys)
       })
     )    
  }
  getUnsubscribedProducts(mobileNumber){
    return this.getSubscribedProducts(mobileNumber).pipe(
      map((res)=>{        
        return res
      })
    )
  }
  subscribeProduct(details){
    return this.http.post(`${this.subscriptionUrl}?${this.apiKey}`,details)
  }
  pauseDelivery(deliveryDetails){
    return this.http.post(`${this.pauseSubscriptionUrl}?${this.apiKey}`,deliveryDetails);

  }
  getProductSubscriptionBtnDates(us){    
    return this.http.get(`${this.subscriptionUrl}?q={mobileNumber:'${us.mobileNumber}',productId:'${us.productId}',startDate:{$lte:'${us.startDate}'},endDate:{$gte:'${us.startDate}'}}&${this.apiKey}`)
    //return this.http.get(`${this.url}?q={mobileNumber:'${us.mobileNumber}',productId:'${us.productId}',startDate:{$lte:'${us.sdate}'},endDate:{$gte:'${us.sdate}'}}&apiKey=${this.apiKey}`)
  }
  modifySubscription(updatedSubscription){
    console.log("updatedSubscription",updatedSubscription);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var sdate = parseInt(updatedSubscription.startDate);
    var edate = parseInt(updatedSubscription.endDate);
    console.log("sdate,edate",sdate,edate);
    this.getProductSubscriptionBtnDates(updatedSubscription)
    .subscribe((res)=>{
      var oldQuantity=res[0].quantity;
      var x = _.toArray(res);
      console.log("x::",x)
      var newSubscriptionData = {'postData':{},'putData':{}}
      
        x[0].endDate = (sdate-86400).toString();
        newSubscriptionData.putData[x[0]._id.$oid]=_.omit(x[0],"_id");
        
        if(edate==4054060800){
          x[0].startDate = (sdate).toString();
          x[0].endDate = "4054060800";
          x[0].quantity= updatedSubscription.quantity;
          newSubscriptionData.postData[x[0]._id.$oid]=_.omit(x[0],"_id");
        }
        else{
          newSubscriptionData.postData[x[0]._id.$oid]=[];          
          x[0].startDate = sdate.toString();;
          x[0].endDate = edate.toString();;
          x[0].quantity= updatedSubscription.quantity;
          newSubscriptionData.postData[x[0]._id.$oid].push(_.omit(x[0],"_id"));
          x[0].startDate = (edate+86400).toString();
          x[0].endDate = "4054060800";
          x[0].quantity= oldQuantity;
          newSubscriptionData.postData[x[0]._id.$oid].push(_.omit(x[0],"_id"));
          console.clear();
          console.log(x[0].startDate)
          console.log(x[0].endDate)
        }
      console.log("subsssss::",newSubscriptionData)
      this.http.post(this.pauseDeliveryUrl,newSubscriptionData,httpOptions).subscribe((res)=>{
        console.log(res);
      });
    });
    return of(true);
  }
}
