import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './legalproceedings.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SWPLegalProceedingsComponent implements OnInit {



  constructor() {
    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    return null;
  }

}
