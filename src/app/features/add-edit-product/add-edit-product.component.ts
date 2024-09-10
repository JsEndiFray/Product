import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {ApiProductStockService} from "../../services/api-product-stock-service";
import {ErrorForm} from "../../interface/error-form";
import {ErrorService} from "../../services/error.service";
import {HttpErrorResponse} from "@angular/common/http";
import {stockIn} from "../../interface/product-backend";


@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {

  // Variables
  id: number;
  accion: string = 'Agregar ';


// Modelo para el formulario, vinculado directamente a la vista
  product: stockIn = {
    name: '',
    description: '',
    price: null,
    stock: null,
  };

  // Modelo para el formulario, vinculado directamente al error
  errorProduct: ErrorForm = {
    nameError: '',
    descriptionError: '',
    priceError: '',
    stockError: '',
  }


  constructor(
    private _apiProductService: ApiProductStockService,
    private router: Router,
    private route: ActivatedRoute,
    private _errorService: ErrorService) {
    // Obtiene el ID del producto desde la URL
    this.id = Number(route.snapshot.paramMap.get('id'));
  }


  ngOnInit(): void {
    // Cambia la acción a "Editar" si se pasa un ID distinto de 0
    if (this.id != 0) {
      this.accion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  // Validar los campos del formulario
  validateForm() {
    this.errorProduct.nameError = !this.product.name ? 'El nombre es obligatorio.' : '';
    this.errorProduct.descriptionError = !this.product.description ? 'La descripción es obligatorio.' : '';
    this.errorProduct.priceError = this.product.price === null ? 'El precio es obligatorio.' : '';
    this.errorProduct.stockError = this.product.stock === null ? 'El stock es obligatorio.' : '';
  }


  // Metodo para obtener el producto y vincularlo al formulario
  getProduct(id: number) {
    this._apiProductService.getProducts(id).subscribe({
      next: (data: { product: stockIn }) => {
        // Asigna el producto recibido al modelo `product`
        this.product = data.product
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No se pudo cargar el producto.',
          confirmButtonText: 'Ok'
        });
        this._errorService.msjError(error)
      }
    });
  }

  // Verificamos que el cliente rellene todos los campos
  addProduct() {
    this.validateForm();
    // Validar los campos
    if (this.product.name === '' || this.product.description === '' || this.product.price === null || this.product.stock === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son abligatorios',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (this.id !== 0) {
      // Editar producto
      this.product.id = this.id;
      this._apiProductService.updateProduct(this.id, this.product).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: `El producto "${this.product.name}" ha sido actualizado correctamente.`,
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/product']);
      })
    } else {
      // Agregar producto
      this._apiProductService.saveProduct(this.product).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: `El producto "${this.product.name}" ha sido agregado correctamente.`,
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/product']);
      })
    }


    // Reiniciar el formulario.
    this.product = {
      name: '',
      description: '',
      price: null,
      stock: null,
    };
  }
}
