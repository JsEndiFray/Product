import {Injectable} from '@angular/core';
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {
  }

  msjError(error: HttpErrorResponse) {
    if (error.error.msg) {
      // Si la API devuelve un mensaje de error específico cuando esta duplicado.
      Swal.fire({
        icon: 'error',
        title: 'Error.',
        text: error.error.msg,
        confirmButtonText: 'Ok'
      })
    } else {
      // Si ocurre otro tipo de error que no tiene un mensaje específico.
      Swal.fire({
        icon: 'info',
        title: 'En mantenimiento',
        text: 'Estamos actualizando vuelva intentarlo mas tarde disculpe las molestias.',
        confirmButtonText: 'Ok'
      })
    }
  }

}


