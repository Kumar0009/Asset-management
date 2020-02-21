
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { TestService } from '../_services/test.service';

@Directive({
  selector: '[testDir]',
  providers: [TestService]
})
export class TestDirective {

  @Input() nTime: number = 1;

  constructor(private tempRef: TemplateRef<any>,
    private viewconRef: ViewContainerRef , 
    private testService : TestService) {

    console.log(this);
  }

}
