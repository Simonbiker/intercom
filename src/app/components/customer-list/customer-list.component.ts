import { TypeofExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerListService } from 'src/app/services/customer-list.service';
import {Customer} from '../../../../customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customer: Customer[] = [];
  intercomLat:number = 53.339428 * Math.PI/180; // changing to radians
  intercomLong: number = -6.257664 * Math.PI/180; // changing to radians
  customerLatitude: any;
  customerLongitude: any;
  debug: boolean = false; // change to true so see console logs.

  constructor(private customerList: CustomerListService) { }

  ngOnInit(): void {
    this.customerList.getCustomer().subscribe(customerResult => {
      this.customer = customerResult;
      //Going throught each customer lat & long
      this.customer.forEach((customer) => {
        let latitude = customer.latitude;
        // setting the lat to number
        this.setLatitude(latitude);
        let longitude = customer.longitude;
        // setting the long to a number
        this.setLongitude(longitude);
       // Making the lat & long radians 
        this.checkingDistenceFromCustomersToIntercome(this.setLatitude(latitude) * Math.PI/180,this.setLongitude(longitude) * Math.PI/180)
      })
    });
  }

  setLatitude(latitude: string):number {
    this.customerLatitude = Number(latitude);
    if(this.debug){console.log('inside setLat', typeof this.customerLatitude, this.customerLatitude);}
    return this.customerLatitude;
  }

  setLongitude(longitude: string):number {
    this.customerLongitude = Number(longitude);
    if(this.debug){console.log(typeof this.customerLongitude, this.customerLongitude);}
    return this.customerLongitude;
  }

  // create a method that will have intercom position and the second position will be the customers positions
  checkingDistenceFromCustomersToIntercome(latCustomerRadin:number, longCustomerRadian: number){
    if(this.debug){
      console.log('latCustomerRadin',typeof latCustomerRadin, latCustomerRadin);
      console.log('longCustomerRadian',typeof longCustomerRadian, longCustomerRadian);
    }

    const r = 6371e3 / 1000; // changing meters to 100km
    // Checking the differens between the customer lat and intercoms lat
    const differenceInLats1 = latCustomerRadin - this.intercomLat;
    // Checking the differens between the customer long and intercoms long
    const differenceInLong2 = longCustomerRadian - this.intercomLong;
    const a = Math.sin(differenceInLats1/2) * Math.sin(differenceInLats1/2) + 
    
    Math.cos(this.intercomLat) * Math.cos(latCustomerRadin) * 
    Math.sin(differenceInLong2/2) * Math.sin(differenceInLong2/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = r * c;
    console.log('After calc',d);
  }

}
