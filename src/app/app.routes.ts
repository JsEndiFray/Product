import { Routes } from '@angular/router';
import {AddEditProductComponent} from "./features/add-edit-product/add-edit-product.component";
import {ListProductComponent} from "./features/list-product/list-product.component";
import {LoginComponent} from "./features/login/login.component";
import {RegisterComponent} from "./features/register/register.component";
import {ProductComponent} from "./features/product/product.component";
import {authGuard} from "./interceptors/auth-guard.guard";


export const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    title:'Login',
  },
  {
    path:'register',
    component: RegisterComponent,
    title:'Register'
  },
  {
    path:'product',
    component: ProductComponent,
    title:'Product',
    canActivate:[authGuard],
    children: [

      {
        path:'add-edit-product',
        component: AddEditProductComponent,
        title:'Agregar Producto',

      },
      {
        path:'edit-product/:id',
        component: AddEditProductComponent,
        title:'Editar Producto',
      },
      {
        path:'',
        component: ListProductComponent,
        title:'Lista de Productos',
      },

    ]
  },
  {
    path:'**',
    redirectTo:'login',
    pathMatch:'full'
  }
];
