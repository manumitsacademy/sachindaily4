import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from '../report/report.service';
import {map} from 'rxjs/operators';
import { ProductService } from '../products/product.service';
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(public http:HttpClient, public rS:ReportService,public pS:ProductService) { }
  deliveryStatusUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/deliveryStatus?"
  deliveriesUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/deliveries";
  apiKey="ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz";

  getDeliveryStatusByDate(date):Promise<any>{ 
    console.log(date)
    return this.http
          .get(`${this.deliveryStatusUrl}q={"deliveryDate":${date}}&apiKey=${this.apiKey}`)
          .toPromise()
          .then((res)=>{
            console.log("Res",res)
            if(res['length']==0){
              return Promise.resolve("pending")
            }
            else{
              return Promise.resolve("deliverd")
            }
          })
  }

  addDeliveryStatus(date){  
    return this.http.post(`${this.deliveryStatusUrl}&apiKey=${this.apiKey}`,{'deliveryDate':date,status:'done'})
  }
  
  addDeliveries(sdate,products){
    this.rS.getAllSubscriptions(sdate).toPromise().then((res)=>{
      var deliveries = res.map((a)=>{
        console.log("Products",products)
        return {
                'mobileNumber':a.mobileNumber,
                'flatNumber':a.flatNumber,
                'productId':a.productId,
                'productName':a.productName,
                'quantity':a.quantity,
                'deliveredDate':sdate,
                'cost':this.pS.products[a.productId].productCost
              }
      })
      console.log(deliveries)
      this.http
      .post(`${this.deliveriesUrl}?apiKey=${this.apiKey}`,deliveries)
      .subscribe((res)=>{console.log("ressss",res)});
    })
  }
  getAllDeliveries(){
    return this.http.get(`${this.deliveriesUrl}?apiKey=${this.apiKey}`)
  }
}
