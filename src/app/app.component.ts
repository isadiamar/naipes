import {Component} from '@angular/core';
import {PersistenceService} from "./shared/services/persistence.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'naipesAngular';
  isLogged: boolean = false;

  constructor(private persistence: PersistenceService) {
    this.isLogged = this.persistence.isLogged;
    this.persistence.loggedChange.subscribe((value) => {
      this.isLogged = value;
    })
  }

  logout(): void {
    this.persistence.setToken(null);
  }

}



