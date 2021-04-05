import { Component } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientTracking';
  showHeader: boolean = false;

  constructor(
    private router: Router,
  ) {
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (event["url"].includes("/login")) {
          this.showHeader = false;
          return;
        }
        if (event["url"].includes("/opentrips")) {
          this.showHeader = true;
          return;
        }
        if (event["url"].includes("/logout")) {
          this.showHeader = false;
          return;
        }        
      }
    })
  }
}
