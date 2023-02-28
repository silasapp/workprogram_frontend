import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableViewComponent } from './table-view.component';

const routes: Routes = [
  {
    path:'',
    component: TableViewComponent
  },
  {
    path:'tableview',
    component: TableViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
