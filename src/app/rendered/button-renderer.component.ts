// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-button-renderer',
  template: `
    <button type="button" class="{{class}}" (click)="onClick($event)">{{label}}<i class="{{icon}}"></i></button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  class: string;
  icon:string;
  label:string;
  agInit(params): void {
    this.params = params;
    this.class = this.params.class || null;
    this.icon = this.params.icon || null;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}