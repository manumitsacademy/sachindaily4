import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { _ } from 'underscore';
import { forkJoin, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:HttpClient) { 
    console.log("Data Service Loaded")
  }
  url="https://api.mlab.com/api/1/databases/sachindaily/collections/";
  productUrl=`${this.url}product`;
  customerUrl=`${this.url}user`;
  subscriptionUrl = `${this.url}subscription`
  apiKey="apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz";
  allProducts;
  getAllProducts(){
    return this.http.get(`${this.productUrl}?${this.apiKey}`).pipe(
      map((products)=>{
        products = _.groupBy(products,'productName');
        return products;
      })
    )
  }
  getProductDetailsByProductName(productName){
    return this.http.get(`${this.productUrl}?q={'productName:'${productName}'}&${this.apiKey}`)
  }
  getAllCustomers(){
    return this.http.get(`${this.customerUrl}?${this.apiKey}`).pipe(
      map((customers)=>{
        customers = _.groupBy(customers,'mobileNumber')
        return customers;
      })
    ) 
  }
  
  getSubscriptions(){
    return this.http.get(`${this.subscriptionUrl}?${this.apiKey}`).pipe(
      map((subscriptions)=>{
        subscriptions = _.groupBy(subscriptions,'mobileNumber')
        return subscriptions;
      })
    ) 
  }
  getAllSubscribedProductsDetailsOfCustomer(mobileNumber){
    return this.http.get(`${this.subscriptionUrl}?${this.apiKey}`).pipe(
      map((subscriptions)=>{
        subscriptions = _.groupBy(subscriptions,'mobileNumber');
        var subscribedProducts = subscriptions[mobileNumber];
        var subscribedProductIds = _.groupBy(subscribedProducts,"productId")
        return subscribedProductIds;
      })
    ) 
  }
  getAllSubscribedProductNamesofCustomer(mobileNumber){
    console.log(mobileNumber)
    return this.http.get(`${this.subscriptionUrl}?${this.apiKey}`).pipe(
      map((subscriptions)=>{
        console.log(subscriptions)
        subscriptions = _.groupBy(subscriptions,'mobileNumber');
        console.log(subscriptions)
        var subscribedProducts = subscriptions[mobileNumber];
        console.log(subscribedProducts)
        var subscribedProductNames = _.groupBy(subscribedProducts,"productName")
        console.log(subscribedProductNames)
        return _.allKeys(subscribedProductNames);
      })
    ) 
  }
  getAllUnSubscribedProductNamesofCustomer(mobileNumber){
    return  forkJoin(
              [this.getAllProducts(),
              this.getAllSubscribedProductNamesofCustomer(mobileNumber)]
            ).pipe(
              map((x)=>{
                console.log(x);
                var allProductIds= _.allKeys(x[0]);
                var allSubscribedProductNames = x[1]
                var allUnSubscribedProductNames=_.difference(allProductIds,allSubscribedProductNames);
                return allUnSubscribedProductNames;
              })
            )
  }
  getProductDetailsOfProductNames(productNames:any[]){
    var productsDetails;
    return this.getAllProducts().pipe(
      map((products)=>{
        productsDetails= productNames.map((productName)=>{
          return products[productName][0]
        })
        return productsDetails;
      })
    )
  }
  getSubscribedProductDetailsOfCustomer(mobileNumber){
    return  this.getAllSubscribedProductNamesofCustomer(mobileNumber)
                .pipe(
                  map((productNames)=>{
                    console.log("productNames",productNames)
                  return this.getProductDetailsOfProductNames(productNames).pipe(
                    map((products)=>{
                      console.log("products",products)
                      return products;
                    })
                  );
                  })
                )
  }
  getUnSubscribedProductDetailsOfCustomer(mobileNumber){
    return  this.getAllUnSubscribedProductNamesofCustomer(mobileNumber)
                .pipe(
                  map((productNames)=>{
                  return this.getProductDetailsOfProductNames(productNames).pipe(
                    map((products)=>{
                      return products;
                    })
                  );
                  })
                )
  }
}
