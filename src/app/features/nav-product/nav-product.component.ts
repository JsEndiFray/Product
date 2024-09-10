import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-product',
  standalone: true,
  imports: [
    MatToolbar
  ],
  templateUrl: './nav-product.component.html',
  styleUrl: './nav-product.component.css'
})
export class NavProductComponent {


  constructor(private router: Router) {
  }


  // para eliminar el token al cerrar la sesion
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
