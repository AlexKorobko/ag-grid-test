import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs';

import { YoutubeService } from '../youtube.service';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { VideoLinkComponent } from '../video-link/video-link.component';
import { SelectRowComponent } from '../select-row/select-row.component';
import { SelectAllHeaderComponent } from '../select-all-header/select-all-header.component';
import { VideoRow } from '../types/video-row';

export const SELECT_COL_ID = 'select';
export const THUMBNAIL_COL_ID = 'thumbnail';
export const PUBLISHED_COL_ID = 'published';
export const TITLE_COL_ID = 'title';
export const DESCRIPTION_COL_ID = 'description';

const defaultContextMenuItems = ['copy', 'copyWithHeaders', 'paste'];

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  public videoData: Observable<VideoRow[]>;
  public columnDefs: ColDef[] = [
    {
      headerName: '',
      cellRendererFramework: SelectRowComponent,
      headerComponentFramework: SelectAllHeaderComponent,
      colId: SELECT_COL_ID,
      width: 60,
      hide: true
    },
    {
      headerName: '',
      cellRendererFramework: ThumbnailComponent,
      colId: THUMBNAIL_COL_ID
    },
    {
      headerName: 'Published On',
      field: 'publishedAt',
      colId: PUBLISHED_COL_ID
    },
    {
      headerName: 'Video Title',
      cellRendererFramework: VideoLinkComponent,
      colId: TITLE_COL_ID
    },
    {
      headerName: 'Description',
      field: 'description',
      flex: 1,
      colId: DESCRIPTION_COL_ID
    }
  ];
  public isSelectionMode = false;
  public showToolbar = false;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.videoData = this.youtubeService.getVideoData();
  }

  onGridReady(): void {
    this.showToolbar = true;
  }

  getContextMenuItems(params): any[] {
    if (params.column.colId === TITLE_COL_ID) {
      return [
        ...defaultContextMenuItems,
        {
          name: 'Open in new tab',
          action: () => window.open(params.node.data.videoLink, '_blank')
        }
      ];
    } else {
      return [...defaultContextMenuItems];
    }
  }

  toggleSelectionMode(): void {
    this.isSelectionMode = !this.isSelectionMode;

    this.agGrid.columnApi.setColumnVisible(SELECT_COL_ID, this.isSelectionMode);
  }

  getRowCount(): number {
    return this.agGrid.api.getDisplayedRowCount();
  }

  getSelectedCount(): number {
    return this.agGrid.api.getSelectedRows().length;
  }
}
