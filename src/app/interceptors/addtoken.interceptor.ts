import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {ErrorService} from "../services/error.service";

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(('token'))
  const route = inject(Router);
  const _errorService = inject(ErrorService);
  if (token) {
    req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        _errorService.msjError(error)
        route.navigate(['/login'])
      }
      return throwError(() => error);
    })
  )
};
