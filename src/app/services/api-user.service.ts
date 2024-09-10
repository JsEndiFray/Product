import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


import {environments} from "../../environments/environment.development";
import {UserIn} from "../interface/user";
import {TokenIn} from "../interface/token-interface";


@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private appUrl: string;
  private appUser: string;

  constructor(private http: HttpClient) {
    this.appUrl = environments.endpoint
    this.appUser = 'user';
  }

  // Conexion a la bd usuario almacenados
  addUser(user: UserIn): Observable<UserIn> {
    return this.http.post<UserIn>(`${this.appUrl}${this.appUser}`, user)
  }

// Conexion a bd usuario para iniciar sesion
  login(user: UserIn): Observable<TokenIn> {
    return this.http.post<TokenIn>(`${this.appUrl}${this.appUser}/login`, user)
  }

}
