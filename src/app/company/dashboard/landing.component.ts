import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./dashboard.component.scss', '../company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {



  constructor() {
    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    return null;
  }

}
