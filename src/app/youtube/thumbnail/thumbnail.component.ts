import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-thumbnail',
  template: '<img height="90" width="120" [src]="params?.data?.thumbnails" alt="Youtube Video Thumbnail">'
})
export class ThumbnailComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
