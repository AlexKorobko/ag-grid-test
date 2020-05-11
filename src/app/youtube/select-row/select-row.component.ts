import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-select-row',
  template: '<input type="checkbox" [checked]="getRowSelected()" (click)="toggleRowSelection($event)">'
})
export class SelectRowComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  toggleRowSelection(e: MouseEvent): void {
    e.stopPropagation();

    const node = this.params.node;
    node.setSelected(!node.isSelected(), false);
  }

  getRowSelected(): boolean {
    return this.params ? this.params.node.isSelected() : false;
  }
}
