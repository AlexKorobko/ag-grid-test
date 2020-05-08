import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { YoutubeModule } from './youtube/youtube.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, YoutubeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
