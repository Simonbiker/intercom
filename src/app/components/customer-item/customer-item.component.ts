import { Component, Input, OnInit } from '@angular/core';
import {Customer} from '../../../../customer';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements OnInit {
  @Input() customer: any;

  constructor() { }

  ngOnInit(): void {
  }

}
