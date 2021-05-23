import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../../customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {
  private apiUrl = 'http://localhost:5000/customers'

  constructor(private http: HttpClient) { }

  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
  
}
