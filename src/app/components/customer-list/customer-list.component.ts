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
  customerUserId: number = 0;
  customerName: string = ''; 
  insideHunderedK: number[] = [];
  listOfCustomers: any[] = [];
  invite: boolean = false;
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
        // Getting list of id's
        this.customerUserId = customer.user_id;
        // Getting the names 
        this.customerName = customer.name
        // Making the lat & long radians 
        this.checkingDistenceFromCustomersToIntercome(this.setLatitude(latitude) * Math.PI/180, this.setLongitude(longitude) * Math.PI/180, 
        this.customerName,this.customerUserId)
      })
    });
    this.getListOfCustomers();
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
  checkingDistenceFromCustomersToIntercome(latCustomerRadin:number, longCustomerRadian: number, name: string, id: number){
    if(this.debug){
      console.log('latCustomerRadin',typeof latCustomerRadin, latCustomerRadin);
      console.log('longCustomerRadian',typeof longCustomerRadian, longCustomerRadian);
    }

    let checkPerson = {
      radian: 0,
      id: 0,
      name: '',
      withinK: false
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
    let d = r * c;

    if(this.debug){console.log('After calc',d)}

    // Checking who is within the 100k limit
    if (d <= 100){
      checkPerson = {
        id: id,
        radian: d,
        name: name,
        withinK: true
      }
    }

    // sorting the list of users. 
    if(checkPerson.withinK == true) {
      this.listOfCustomers.sort((a,b)=> (a.id > b.id) ? 1:-1);
      this.listOfCustomers.push(checkPerson);
    }

  }

  getListOfCustomers(){
    //check if there is no duplications 
    this.insideHunderedK;
    if(this.debug){console.log('inside 100k:', this.listOfCustomers)}
  }

  onClickInvite(){
    this.invite = true;
  }

}
