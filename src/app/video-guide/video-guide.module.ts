import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoGuideComponent } from './video-guide.component';
import { IgniteUIModule, IgVideoPlayerComponent} from 'igniteui-angular-wrappers';


@NgModule({
  declarations: [
    VideoGuideComponent
    
  ],
  imports: [
    CommonModule,
    IgniteUIModule
    
  ]
})
export class VideoGuideModule { }
