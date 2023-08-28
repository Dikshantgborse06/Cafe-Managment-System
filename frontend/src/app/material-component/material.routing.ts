import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';



export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate: [RouteGuardService],  
        data:{
            expectedRole: ['admin']  //only admin can access this route

        }
    },
    {
        path: 'product',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],  
        data:{
            expectedRole: ['admin']  //only admin can access this route
            
        }
    },
    {
        path: 'order',
        component: ManageOrderComponent,
        canActivate: [RouteGuardService],  
        data:{
            expectedRole: ['admin','user']  //both can access this route
            
        }
    },
    {
        path: 'bill',
        component: ViewBillComponent,
        canActivate: [RouteGuardService],  
        data:{
            expectedRole: ['admin','user']  //both can access this route
            
        }
    },
    {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGuardService],  
        data:{
            expectedRole: ['admin']  //both can access this route
            
        }
    }

];
