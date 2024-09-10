import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {ProductBackend, stockIn} from "../interface/product-backend";

@Injectable({
  providedIn: 'root'
})
export class ApiProductStockService {
  private appUrl: string;
  private appProduct: string;

  constructor(private http: HttpClient) {
    this.appUrl = environments.endpoint;
    this.appProduct = 'product';
  }

//Lista de los productos
  getListProduct(): Observable<ProductBackend> {
    return this.http.get<ProductBackend>(`${this.appUrl}${this.appProduct}`);
  }

// Eliminar el producto
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.appProduct}/${id}`);
  }

  // Agregar producto
  saveProduct(product: stockIn): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.appProduct}`, product);
  }

  // Editar producto
  getProducts(id: number): Observable<{product: stockIn}> {
    return this.http.get<{product: stockIn}>(`${this.appUrl}${this.appProduct}/${id}`)
  }

  // Actualizar producto
  updateProduct(id: number, product: stockIn): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.appProduct}/${id}`, product);
  }

}
