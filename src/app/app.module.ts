import { ContainerComponent } from './_components/container/container.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemComponent } from './_components/item/item.component';
import { TestComponent } from './_components/test/test.component';
import { TestDirective } from './_strDirective/test.directive';

@NgModule({
  declarations: [
    AppComponent,

    ContainerComponent,

    ItemComponent,

    TestComponent,

    TestDirective

  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log(this);
  }
}
