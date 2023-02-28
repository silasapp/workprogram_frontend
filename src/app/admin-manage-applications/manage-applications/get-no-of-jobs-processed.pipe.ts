import { Pipe, PipeTransform } from '@angular/core';
import { IDeskStaffApps, IDesk } from './manage-applications.component';

@Pipe({
  name: 'getNoOfJobsProcessed',
})
export class GetNoOfJobsProcessedPipe implements PipeTransform {
  transform(value: number, data: IDeskStaffApps[], desk: IDesk): number {
    const result = data.filter((d) => d.desk.hasWork == false);
    return result.length;
  }
}
