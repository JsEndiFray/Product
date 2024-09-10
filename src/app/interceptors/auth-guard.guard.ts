import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";




export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem(('token'))
  const router = inject(Router);
  if(token == undefined){
    router.navigate(['/login'])
  }
  return true;
};
