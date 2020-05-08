import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { VideoGridComponent } from './video-grid/video-grid.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { VideoLinkComponent } from './video-link/video-link.component';
import { SelectRowComponent } from './select-row/select-row.component';
import { SelectAllHeaderComponent } from './select-all-header/select-all-header.component';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([ThumbnailComponent, SelectRowComponent, SelectAllHeaderComponent, VideoLinkComponent])
  ],
  exports: [VideoGridComponent],
  declarations: [VideoGridComponent, ThumbnailComponent, VideoLinkComponent, SelectRowComponent, SelectAllHeaderComponent]
})
export class YoutubeModule {}
