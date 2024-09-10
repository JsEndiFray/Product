import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ApiProductStockService} from "../../services/api-product-stock-service";
import {ErrorService} from "../../services/error.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductBackend, stockIn} from "../../interface/product-backend";
import Swal from "sweetalert2";
import {DecimalPipe} from "@angular/common";


@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe

  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {


  listProduct: stockIn[] = [];

  constructor(
    private _apiProductService: ApiProductStockService,
    private _errorService: ErrorService,
  ) {
  }

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct(): void {
    this._apiProductService.getListProduct().subscribe({
      next: (data: ProductBackend) => {
        this.listProduct = data.products;
      }, error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    });
  }

  deleteProduct(id: number): void {
    this._apiProductService.deleteProduct(id).subscribe({
      next: () => {
        this.getListProduct();
        Swal.fire({
          icon: "success",
          title: `El Producto fue eliminado correctamente`,
          confirmButtonText: 'Ok'
        });
      }, error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }


}
