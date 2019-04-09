import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _ } from 'underscore'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerUrl = "https://api.mlab.com/api/1/databases/sachindaily/collections/user"
  apiKey="apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz"
  constructor(public http:HttpClient) {
    this.http.get(`${this.customerUrl}?${this.apiKey}`).subscribe((res)=>{
      this.allUsers=_.groupBy(res,'mobileNumber');
      console.log("this.allUsers",this.allUsers)
    })
  }
  allUsers;
  getAllUsers(){}
  ngOnInit(){
    
  }
}
