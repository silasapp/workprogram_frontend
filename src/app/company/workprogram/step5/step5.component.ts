import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';

@Component({
  templateUrl: './step5.component.html',
  styleUrls: ['../board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step5Component implements OnInit {
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
