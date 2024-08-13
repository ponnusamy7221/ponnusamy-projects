import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/home/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'master',
        loadComponent: () =>
          import('./pages/home/master/master.component').then(
            (c) => c.MasterComponent
          ),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'user',
          },
          {
            path: 'user',
            loadComponent: () =>
              import('./pages/home/master/user/user.component').then(
                (c) => c.UserComponent
              ),
          },
          {
            path: 'customer',
            loadComponent: () =>
              import('./pages/home/master/customer/customer.component').then(
                (c) => c.CustomerComponent
              ),
          },
          {
            path: 'vendor',
            loadComponent: () =>
              import('./pages/home/master/vendor/vendor.component').then(
                (c) => c.VendorComponent
              ),
          },
          {
            path: 'warehouse',
            loadComponent: () =>
              import('./pages/home/master/warehouse/warehouse.component').then(
                (c) => c.WarehouseComponent
              ),
          },
        ],
      },
      {
        path: 'order',
        loadComponent: () =>
          import('./pages/home/order/order.component').then(
            (c) => c.OrderComponent
          ),

        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '',
          },
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/home/order/order-detail/initial/initial.component'
              ).then((c) => c.InitialComponent),
          },
          {
            path: 'new/:id',
            loadComponent: () =>
              import('./pages/home/order/order-detail/new/new.component').then(
                (c) => c.NewComponent
              ),
          },
          {
            path: 'view',
            loadComponent: () =>
              import(
                './pages/home/order/order-detail/view/view.component'
              ).then((c) => c.ViewComponent),
          },
          {
            path: 'received_invoice/:id',
            loadComponent: () =>
              import(
                './pages/home/order/order-detail/received-invoice/received-invoice.component'
              ).then((c) => c.ReceivedInvoiceComponent),
          },
          {
            path: 'without_invoice/:id',
            loadComponent: () =>
              import(
                './pages/home/order/order-detail/without-invoice/without-invoice.component'
              ).then((c) => c.WithoutInvoiceComponent),
          },
          {
            path: 'preOrder',
            loadComponent: () =>
              import(
                './pages/home/order/order-detail/pre-order/pre-order.component'
              ).then((c) => c.PreOrderComponent),
          },
          {
            path: 'preOrder/new/:id',
            loadComponent: () =>
              import(
                './pages/home/order/order-detail/pre-order-new/pre-order-new.component'
              ).then((c) => c.PreOrderNewComponent),
          },
        ],
      },
      {
        path: 'repacking',
        loadComponent: () =>
          import('./pages/home/re-packing/re-packing.component').then(
            (c) => c.RePackingComponent
          ),

        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '',
          },
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/re-packing/initial/initial.component').then(
                (c) => c.InitialComponent
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./pages/home/re-packing/new/new.component').then(
                (c) => c.NewComponent
              ),
          },
          {
            path: 'order/:id',
            loadComponent: () =>
              import('./pages/home/re-packing/order/order.component').then(
                (c) => c.OrderComponent
              ),
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./pages/home/re-packing/view/view.component').then(
                (c) => c.ViewComponent
              ),
          },
        ],
      },
      {
        path: 'export_invoice',
        loadComponent: () =>
          import('./pages/home/export-invoice/export-invoice.component').then(
            (c) => c.ExportInvoiceComponent
          ),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '',
          },
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/home/export-invoice/initial/initial.component'
              ).then((c) => c.InitialComponent),
          },
          {
            path: 'invoice/:id',
            loadComponent: () =>
              import(
                './pages/home/export-invoice/invoice/invoice.component'
              ).then((C) => C.InvoiceComponent),
          },
          {
            path: 'new/:id',
            loadComponent: () =>
              import('./pages/home/export-invoice/new/new.component').then(
                (C) => C.NewComponent
              ),
          },
        ],
      },
      {
        path: 'final_packing',
        loadComponent: () =>
          import('./pages/home/final-packing/final-packing.component').then(
            (c) => c.FinalPackingComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
