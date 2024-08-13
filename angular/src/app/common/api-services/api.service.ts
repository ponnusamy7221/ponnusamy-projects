import { Injectable } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private data: DataService) {}

  authenticateUser(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/AuthenticateUser', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchUser(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/SearchUser', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveUser(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/SaveUser', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openUser(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/OpenUser', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateUser(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/UpdateUser', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteUser(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/DeleteUser', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createSubconfig(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('Admin/CreateNewSubConfig', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveSubconfig(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('Admin/SaveSubConfig', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  // initial data

  getInitialDataForOrder(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('GetInitialDataForOrder', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  // order

  getOrderSearch(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewOrderDetailsSearch', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchOrderDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchPreOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchPreorder', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('CreateNewOrderDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveOrderDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenOrderDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateOrderDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteOrderDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createLRDetail(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewLRDetails', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveLRDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveLRDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openLRDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenLRDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateLRDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateLRDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteLRDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteLRDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createInvoiceDetail(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewInvoiceDetails', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveInvoiceDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveInvoiceDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openInvoiceDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenInvoiceDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateInvoiceDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateInvoiceDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteInvoiceDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteInvoiceDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createInvoiceDetailItem(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewInvoiceDetailsItems', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveInvoiceDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveInvoiceDetailsItems', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openInvoiceDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenInvoiceDetailsItems', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateInvoiceDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateInvoiceDetailsItems', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteInvoiceDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteInvoiceDetailsItems', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createDeliverySlipDetail(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewOrderDeliverySlipDetail', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveDeliverySlipDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveOrderDeliverySlipDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openDeliverySlipDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenOrderDeliverySlipDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateDeliverySlipDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateOrderDeliverySlipDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteDeliverySlipDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteOrderDeliverySlipDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createDeliverySlipDetailItem(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .get('CreateNewOrderDeliverySlipDetailsItems', options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  saveDeliverySlipDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .post('SaveOrderDeliverySlipDetailsItems', body, options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  openDeliverySlipDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .post('OpenOrderDeliverySlipDetailsItems', body, options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  updateDeliverySlipDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .post('UpdateOrderDeliverySlipDetailsItems', body, options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  createPreOrder(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewPreorder', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  savePreOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SavePreorder', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openPreOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenPreorder', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updatePreOrder(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdatePreorder', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  getRepackingSearch(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewRepackingDetailSearch', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchRepacking(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchRepackingDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  getRepackingForOrderDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('GetOrderDetailsForRepaking', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openRepackingDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenRepackingDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveInvoiceAndDeliverySlip(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .post('SaveInvoiceDetailsAndSlipDetails', body, options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  getRepackingDetailBasedOnValues(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('GetOrderDetailsBasedOnValues', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  checkOrderStatusInRepacking(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('CheckOrderStatusInRepacking', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createNewRepackingItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('CreateNewRepackingListDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveRepackingDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveRepackingDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateRepackingDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateRepackingDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  approveRepackingDetail(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateApprovedRepackingDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchFinalPacking(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchFinalPackingDetails', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchExportInvoice(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchExportInvoice', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createNewSearchCustomer(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewCustomerSearch', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchCustomer(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchCustomer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createCustomer(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewCustomer', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveCustomer(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveCustomer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateCustomer(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateCustomer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openCustomer(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenCustomer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteCustomer(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteCustomer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchWareHouse(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchWareHouse', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createWarehouse(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewWareHouse', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveWarehouse(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveWareHouse', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateWarehouse(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateWareHouse', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openWarehouse(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenWareHouse', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createBuyer(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewBuyer', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveBuyer(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveBuyer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createConsignee(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewConsignee', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveConsignee(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveConsignee', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  getSearchVendor(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewVendorSearch', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchVendor(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchVendor', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createVendor(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewVendor', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveVendor(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveVendor', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateVendor(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateVendor', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openVendor(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenVendor', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  getTodayOrders(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('GetTodayPreorders', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createNewExportInvoice(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewExportInvoice', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveExportInvoice(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveExportInvoice', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateExportInvoice(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateExportInvoice', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openExportInvoice(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenExportInvoice', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createNewExportInvoiceDetail(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewExportInvoiceDetail', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  getInStockInvoiceDetailBasedPakgNO(
    body: any,
    options?: any
  ): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .post('GetInStockInvoiceDetailBasedPakgNO', body, options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  getOrdersDetailsForDashBoard(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('GetOrdersDetailsForDashBoard', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  getOrdersDetailsMonthWise(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('GetOrdersDetailsMonthWise', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteReceivedInvoiceItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteInvoiceDetailsItems', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteDeliverySlipDetailItem(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteOrderDeliverySlipDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteRepackingList(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteRepackingListDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteExportInvoiceList(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteExportInvoiceDetail', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createExporter(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewExporter', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveExporter(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveExporter', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createExporterConsignee(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewExportConsignee', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveExporterConsignee(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveExportConsignee', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createParty(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewParty', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveParty(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveParty', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createNewSearchProduct(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewCustomerSearch', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  searchProduct(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SearchCustomer', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  createProduct(options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.get('CreateNewProduct', options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  saveProduct(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('SaveProduct', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  updateProduct(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('UpdateProduct', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  openProduct(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('OpenProduct', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  deleteProduct(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('DeleteProduct', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  generateExportInvoiceExcel(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('GenerateExportInvoiceExcel', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }

  generateExportInvoiceWithoutPackageExcel(
    body: any,
    options?: any
  ): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data
      .post('GenerateExportInvoiceWithoutPakageNoExcel', body, options)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          options
            ? options.hideErrorMethod
              ? ''
              : this.data.errorMethod(err)
            : '';
          return throwError(err);
        })
      );
  }

  autoSearchForCommon(body: any, options?: any): Observable<any> {
    options === undefined
      ? (options = this.data.defaultOptions)
      : (options = this.data.setOptions(options));
    return this.data.post('AutoSearchForCommon', body, options).pipe(
      finalize(() => {}),
      catchError((err) => {
        options
          ? options.hideErrorMethod
            ? ''
            : this.data.errorMethod(err)
          : '';
        return throwError(err);
      })
    );
  }
}
