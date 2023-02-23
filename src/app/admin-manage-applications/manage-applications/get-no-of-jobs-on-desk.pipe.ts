import { Pipe, PipeTransform } from '@angular/core';
import { IDesk, IDeskStaffApps } from './manage-applications.component';

@Pipe({
  name: 'getNoOfJobsOnDesk',
})
export class GetNoOfJobsOnDeskPipe implements PipeTransform {
  transform(value: number, data: IDeskStaffApps[], desk: IDesk): number {
    const result = data.filter((d) => d.desk.hasWork == true);
    return result.length;
  }
}
