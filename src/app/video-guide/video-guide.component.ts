import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-guide',
  templateUrl: './video-guide.component.html',
  styleUrls: ['./video-guide.component.scss']
})
export class VideoGuideComponent implements OnInit {

  public videoPlayer: any;  
  
  constructor() {  
    this.videoPlayer = {  
      options: {  
        width: '100%',  
        sources: ['https://dl.infragistics.com/pg/2011-1/web/shared/videoplayer/videos/Infragistics_Presentation_lowRes_1.h264.mp4',  
          'https://dl.infragistics.com/pg/2011-1/web/shared/videoplayer/videos/Infragistics_Presentation_lowRes_1.webmvp8.webm',  
          'https://dl.infragistics.com/pg/2011-1/web/shared/videoplayer/videos/Infragistics_Presentation_lowRes_1.theora.ogv']  
      }  
    };  
  }  

  ngOnInit(): void {
  }

}
