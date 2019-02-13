import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div class="wrapper">
    <router-outlet></router-outlet>
    <error></error>
    <attention-popup></attention-popup>
    <info-popup></info-popup>
    <confirm-popup></confirm-popup>
    <loader></loader>
</div>
`
})
export class App {
  private viewContainerRef: ViewContainerRef;
  
  public constructor(viewContainerRef:ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
}