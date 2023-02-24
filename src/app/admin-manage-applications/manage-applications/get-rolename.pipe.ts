import { Pipe, PipeTransform } from '@angular/core';
import { IRole } from 'src/app/role-configuration/role-configuration/role-configuration.component';

@Pipe({
  name: 'getRolename',
})
export class GetRolenamePipe implements PipeTransform {
  transform(value: unknown, roles: IRole[]): unknown {
    console.log('in pipe', value, roles);
    return roles.find((r) => r.id == value)?.roleName;
  }
}
