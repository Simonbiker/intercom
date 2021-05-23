import { Component, OnInit } from '@angular/core';
import { CustomerListService } from 'src/app/services/customer-list.service';
import {Customer} from '../../../../customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customer: Customer[] = [];

  constructor(private customerList: CustomerListService) { }

  ngOnInit(): void {
    this.customerList.getCustomer().subscribe(customerResult => {
      this.customer = customerResult;
    });
    this.getlatitude();
    this.getlongitude();
  }

  getlatitude() {
    this.customerList.getCustomer().subscribe(customerResult => {
      this.customer = customerResult;
      this.customer.forEach((customer) => {
        const latitude = customer.latitude;
        console.log(latitude);
        return latitude;
      })
    });
  }

  getlongitude() {
    this.customerList.getCustomer().subscribe(customerResult => {
      this.customer = customerResult;
      this.customer.forEach((customer) => {
        const longitude = customer.longitude;
        console.log(longitude);
        return longitude;
      })
    });
  }

  // create a method that converts lat and longs
  // create a method that will have intercom position and the second position will be the customers positions
  // Convert lat1
  // Convert long1
  // Convert lat2
  // Convert long2
  // Add var for checking the diff of lat 
  // Add var for checking the diff of long

  // create a method that checks differences between two points.

}
