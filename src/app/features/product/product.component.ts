import { Component } from '@angular/core';
import {NavProductComponent} from "../nav-product/nav-product.component";
import {ListProductComponent} from "../list-product/list-product.component";
import {AddEditProductComponent} from "../add-edit-product/add-edit-product.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NavProductComponent,
    ListProductComponent,
    AddEditProductComponent,
    RouterOutlet
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {


}
