import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {ApiUserService} from "../../services/api-user.service";
import Swal from "sweetalert2";
import {UserIn} from "../../interface/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private _apiUserService: ApiUserService,
    private _errorService: ErrorService,
    private router: Router
  ) {
  }

  login() {
    if (this.username == '' || this.password == '') {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son abligatorios',
        confirmButtonText: 'Ok'
      });
      return;
    }
    const user: UserIn = {
      username: this.username,
      password: this.password,
    }

// Configuracion para la conexion con el api a bd.
    this._apiUserService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token.token)
        this.router.navigate(['/product']);
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }

    })

  }

}
