import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./features/navbar/navbar.component";
import {LoginComponent} from "./features/login/login.component";
import {DataObserveService} from "./observable/dataobserve.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  deactivate: boolean = true;
  constructor(private $DataObservableService: DataObserveService) {
    this.$DataObservableService.$NavFooter.subscribe(insert => {
      this.deactivate = insert;
    })
  }

}
