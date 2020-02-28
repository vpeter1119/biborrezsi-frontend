import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  isLoading: boolean;

  public switchLoading(b: boolean) {
    console.warn("Switching isLoading to " + b);
    this.isLoading = b;
  }
}
