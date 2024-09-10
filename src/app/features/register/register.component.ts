import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiUserService} from "../../services/api-user.service";
import {ErrorService} from "../../services/error.service";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {UserIn} from "../../interface/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(
    private _apiUserService: ApiUserService,
    private _errorService: ErrorService,
    private router: Router
  ) {
  }


  addUser() {
// Validacion que todos los campos esten bien.
    if (this.username === '' || this.password === '' || this.confirmPassword === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        confirmButtonText: 'Ok'
      });
      return;
    }
    //validacion que las contraseñas sean iguales.
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Las contraseñas no coinciden.',
        confirmButtonText: 'Ok'
      });
      return;
    }
    // Creamos los objetos.
    const user: UserIn = {
      username: this.username,
      password: this.password
    };

    //Configuramos el api con los datos que este correctamente
    this._apiUserService.addUser(user).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: `El Usuario ${this.username} se ha creado correctamente`,
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/login']);
        //Manejar el error
      }, error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }
}
