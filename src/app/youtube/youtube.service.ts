import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import SearchListResponse = gapi.client.youtube.SearchListResponse;

import { VideoRow } from './types/video-row';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  public getVideoData(): Observable<VideoRow[]> {
    return this.http
      .get<SearchListResponse>(
        `https://www.googleapis.com/youtube/v3/search?key=${environment.apiKey}&maxResults=50&type=video&part=snippet&q=john`
      )
      .pipe(
        map(response =>
          response.items.map(i => {
            const data = i.snippet;
            const id = i.id;
            return {
              thumbnails: data.thumbnails.default.url,
              publishedAt: data.publishedAt,
              title: data.title,
              videoLink: `https://www.youtube.com/watch?v=${id.videoId}`,
              description: data.description
            };
          })
        )
      );
  }
}
