import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl="https://api.mlab.com/api/1/databases/sachindaily/collections/product";
  apiKey="apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz";
  products={};
  constructor(public http:HttpClient) {this.getProductDetails();console.log("ProductService") }
  getProductDetails(){
    return this.http.get(`${this.productUrl}?${this.apiKey}`).pipe(map((a)=>{      
      for(let p in a){
        this.products[a[p]._id.$oid]={
                                  'productName':a[p].productName,
                                  'productImageUrl':a[p].productImageUrl,
                                  'productCost':a[p].productPrice.cost
                                }
      }
      return this.products;
    })).subscribe((res)=>{console.log("product service ",this.products)})
  }
}
