import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { DESCRIPTION_COL_ID, SELECT_COL_ID, TITLE_COL_ID, VideoGridComponent } from './video-grid.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { SelectRowComponent } from '../select-row/select-row.component';
import { SelectAllHeaderComponent } from '../select-all-header/select-all-header.component';
import { VideoLinkComponent } from '../video-link/video-link.component';
import { YoutubeService } from '../youtube.service';
import { VideoRow } from '../types/video-row';

const mockMouseEvent = { stopPropagation: () => {}, preventDefault: () => {} };

jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

const mockVideoData: VideoRow[] = [
  {
    thumbnails: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
    publishedAt: '2011-05-12T20:01:31.000Z',
    title: 'Lil Wayne - John ft. Rick Ross (Explicit) (Official Music Video)',
    videoLink: 'https://www.youtube.com/watch?v=3fumBcKC6RE',
    description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.'
  },
  {
    thumbnails: 'https://i.ytimg.com/vi/CdJMkQzTiWA/default.jpg',
    publishedAt: '2012-05-12T20:01:31.000Z',
    title: 'Other video',
    videoLink: 'https://www.youtube.com/watch?v=CdJMkQzTiWA',
    description: 'Other videoOther videoOther videoOther videoOther video'
  }
];

describe('VideoGridComponent', () => {
  let component: VideoGridComponent;
  let fixture: ComponentFixture<VideoGridComponent>;
  let mockYoutubeService;
  let element;
  let debugElement;

  beforeEach(async(() => {
    mockYoutubeService = jasmine.createSpyObj(['getVideoData']);
    mockYoutubeService.getVideoData.and.returnValue(of(mockVideoData));

    TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([ThumbnailComponent, SelectRowComponent, SelectAllHeaderComponent, VideoLinkComponent])],
      declarations: [VideoGridComponent, ThumbnailComponent, VideoLinkComponent, SelectRowComponent, SelectAllHeaderComponent],
      providers: [{ provide: YoutubeService, useValue: mockYoutubeService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGridComponent);
    fixture.autoDetectChanges(true);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grid API is available', () => {
    expect(component.agGrid.api).toBeTruthy();
  });

  it('renders a row for each entry in video data array', () => {
    const rows = element.querySelectorAll('.ag-center-cols-container > .ag-row');
    expect(rows.length).toBe(mockVideoData.length);
  });

  it('shows proper total count', () => {
    expect(element.querySelector('#total').innerHTML).toBe('Total: 2');
  });

  describe('row selection', () => {
    beforeEach(() => fixture.whenStable());

    it('selection mode buttons works', async () => {
      expect(component.agGrid.columnApi.getColumn(SELECT_COL_ID).isVisible()).toBeFalse();
      expect(debugElement.query(By.css('#selected'))).toBeFalsy();
      debugElement.query(By.css('#toggle-selection')).triggerEventHandler('click', mockMouseEvent);
      fixture.detectChanges();
      const selectedElement = debugElement.query(By.css('#selected'));
      expect(selectedElement).toBeTruthy();
      expect(selectedElement.nativeElement.innerHTML).toBe('Selected: 0');
      expect(component.agGrid.columnApi.getColumn(SELECT_COL_ID).isVisible()).toBeTrue();
    });

    it('select all checkbox works', async () => {
      debugElement.query(By.css('#toggle-selection')).triggerEventHandler('click', mockMouseEvent);
      const selectAllCheckbox = debugElement.query(By.css('app-select-all-header > input[type=checkbox]'));
      selectAllCheckbox.triggerEventHandler('click', mockMouseEvent);
      expect(component.agGrid.api.getSelectedRows().length).toBe(2);
    });

    it('select all checkbox changes, when row selection changes', async () => {
      component.agGrid.api.selectAll();
      debugElement.query(By.css('#toggle-selection')).triggerEventHandler('click', mockMouseEvent);
      const selectAllCheckbox = debugElement.query(By.css('app-select-all-header > input[type=checkbox]'));
      expect(selectAllCheckbox.nativeElement.checked).toBeTrue();
    });
  });

  it('getContextMenuItems returns four items for video title column', () => {
    expect(component.getContextMenuItems({ column: { colId: TITLE_COL_ID } }).length).toBe(4);
  });

  it('getContextMenuItems returns four items for any other column', () => {
    expect(component.getContextMenuItems({ column: { colId: DESCRIPTION_COL_ID } }).length).toBe(3);
  });
});
