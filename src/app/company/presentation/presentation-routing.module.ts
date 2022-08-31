import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectDateComponent } from './select-date/select-date.component';
import { UploadPresentationComponent } from './upload-presentation/upload-presentation.component';

const routes: Routes = [
  {
    path:'select-date',
    component: SelectDateComponent
  },
  {
    path:'upload-presentation',
    component: UploadPresentationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
