import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-guide',
  templateUrl: './video-guide.component.html',
  styleUrls: ['./video-guide.component.scss']
})
export class VideoGuideComponent implements OnInit {

  public videoPlayer: any;  
  
  constructor() {  
  
  }  

  ngOnInit(): void {
  }

}
