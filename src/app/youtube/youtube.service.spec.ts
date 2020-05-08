import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import SearchListResponse = gapi.client.youtube.SearchListResponse;

import { YoutubeService } from './youtube.service';
import { VideoRow } from './types/video-row';
import { environment } from '../../environments/environment';

const response: SearchListResponse = {
  kind: 'youtube#searchListResponse',
  etag: '"Dn5xIderbhAnUk5TAW0qkFFir0M/zNRnCOaUt_cSo9HId8kmlybCV4w"',
  nextPageToken: 'CDIQAA',
  regionCode: 'UA',
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 50
  },
  items: [
    {
      kind: 'youtube#searchResult',
      etag: '"Dn5xIderbhAnUk5TAW0qkFFir0M/Kq-9mzFf1I2LRyeEko4DAb5CdBA"',
      id: {
        kind: 'youtube#video',
        videoId: '3fumBcKC6RE'
      },
      snippet: {
        publishedAt: '2011-05-12T20:01:31.000Z',
        channelId: 'UCEOhcOACopL42xyOBIv1ekg',
        title: 'Lil Wayne - John ft. Rick Ross (Explicit) (Official Music Video)',
        description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/3fumBcKC6RE/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/3fumBcKC6RE/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'LilWayneVEVO',
        liveBroadcastContent: 'none'
      }
    }
  ]
};
const mappedVideoData: VideoRow[] = [
  {
    thumbnails: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
    publishedAt: '2011-05-12T20:01:31.000Z',
    title: 'Lil Wayne - John ft. Rick Ross (Explicit) (Official Music Video)',
    videoLink: 'https://www.youtube.com/watch?v=3fumBcKC6RE',
    description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.'
  }
];

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(YoutubeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([YoutubeService], () => {
    expect(service).toBeTruthy();
  }));

  it('should get and map video data', () => {
    service.getVideoData().subscribe(data => {
      expect(data).toEqual(mappedVideoData);
    });

    const videoDataRequest = httpMock.expectOne(
      `https://www.googleapis.com/youtube/v3/search?key=${environment.apiKey}&maxResults=50&type=video&part=snippet&q=john`
    );
    videoDataRequest.flush(response);

    httpMock.verify();
  });
});
