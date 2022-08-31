import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';

@Component({
  templateUrl: './step2.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component implements OnInit {
  genk: GenericService;


  constructor(private gen: GenericService) {
    this.genk = gen;
   }

  ngOnInit(): void {
  }

  onSubmit(){
    return null;
  }

}
