import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataObserveService {

  private Deactivate = new BehaviorSubject<boolean>(true);

  $NavFooter: Observable<boolean> = this.Deactivate.asObservable()

  constructor(private router: Router) {
    this.router.events.subscribe(events=>{
      if(events instanceof NavigationEnd){
        this.Deactivate.next(!events.url.includes('product'))
      }
    })
  }
}
