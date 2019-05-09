import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute,Router } from '@angular/router'
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customerForm:FormGroup;
  customerDetails;
  constructor(public fb:FormBuilder,public cS:CustomerService,
              public aR:ActivatedRoute,public router:Router) { 
    this.aR.queryParams.subscribe((res)=>{
      this.customerDetails=res;
      console.log(this.customerDetails);
    });
    this.customerForm = this.fb.group({
      name: [this.customerDetails.name,[Validators.required]],
      emailId: [this.customerDetails.emailId,[Validators.required]],
      mobileNumber: [this.customerDetails.mobileNumber,[Validators.required]],
      flatNumber:[this.customerDetails.flatNumber,[Validators.required]],
      wing: [this.customerDetails.wing,[Validators.required]],
      societyName: [this.customerDetails.societyName,[Validators.required]],
      area:[this.customerDetails.area,[Validators.required]],
      city: [this.customerDetails.city,[Validators.required]],
      password:[this.customerDetails.password,[Validators.required]]
    })
  }
  updateCustomer(){
    console.log(this.customerForm.value)
    this.cS.updateCustomer(this.customerForm.value,this.customerDetails._id)
    .subscribe((res)=>{
      console.log(res);
      alert("Customer Details Updated Successfully")
      this.router.navigate(["/home/customer/customerList"])
    })
  }
  ngOnInit() {
  }

}
