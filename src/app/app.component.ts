import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles:[]
})
export class AppComponent {
  constructor( private host : ViewContainerRef){
      console.log(this);
  }
}
