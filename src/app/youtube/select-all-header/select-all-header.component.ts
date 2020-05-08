import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-select-all-header',
  template: '<input type="checkbox" [checked]="isAllSelected" (click)="toggleAllSelection($event)">'
})
export class SelectAllHeaderComponent implements IHeaderAngularComp {
  public params: IHeaderParams;
  public isAllSelected = false;

  agInit(params: IHeaderParams): void {
    this.params = params;

    this.isAllSelected = this.params.api.getSelectedRows().length === this.params.api.getDisplayedRowCount();

    this.params.api.addEventListener('selectionChanged', () => {
      this.isAllSelected = this.params.api.getSelectedRows().length === this.params.api.getDisplayedRowCount();
    });
  }

  toggleAllSelection(e: MouseEvent): void {
    e.stopPropagation();

    if (this.isAllSelected) {
      this.params.api.deselectAll();
    } else {
      this.params.api.selectAll();
    }
  }
}
