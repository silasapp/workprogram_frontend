import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './strategicplans.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPStrategicPlansComponent implements OnInit {



  constructor() {
    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    return null;
  }

}
