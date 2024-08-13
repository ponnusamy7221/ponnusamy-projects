import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BehaviorService {
  private orderSubject = new BehaviorSubject({});

  constructor() {}

  setOrder(item: any): void {
    this.orderSubject.next(item);
  }

  getOrder(): Observable<any> {
    return this.orderSubject.asObservable();
  }
}
