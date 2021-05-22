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
    this.customerList.getCustomer().subscribe((customers) =>(this.customer = customers))
  }

}
