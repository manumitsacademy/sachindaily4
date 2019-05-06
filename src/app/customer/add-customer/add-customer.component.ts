import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerForm:FormGroup;
  constructor(public fb:FormBuilder,public cS:CustomerService) { 
    this.customerForm = this.fb.group({
      name: ['',[Validators.required]],
      emailId: ['',[Validators.required]],
      mobileNumber: ['',[Validators.required]],
      flatNumber:['',[Validators.required]],
      wing: ['',[Validators.required]],
      societyName: ['',[Validators.required]],
      area:['',[Validators.required]],
      city: ['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  addCustomer(){
    console.log(this.customerForm.value)
    this.cS.addCustomer(this.customerForm.value).subscribe((res)=>{
      alert("customer added successfully")
      console.log(res);
    })
  }
  ngOnInit() {
  }

}
