import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './nigeriacontent.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPNigeriaContentComponent implements OnInit {



  constructor() {
    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    return null;
  }

}
