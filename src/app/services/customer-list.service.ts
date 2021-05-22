import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {
  private apiUrl = 'http//localhost:5000/customers'

  constructor(private http: HttpClient) { }

  
}
