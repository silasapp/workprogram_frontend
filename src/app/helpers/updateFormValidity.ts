import { FormGroup } from '@angular/forms';

export function updateFormValidity(form: FormGroup) {
  form.updateValueAndValidity({ onlySelf: true, emitEvent: false });

  for (const control in form.controls) {
    form.controls[control].setErrors(null);
    form.controls[control].markAsPristine();
    form.controls[control].markAsUntouched();
    // form.controls[control].updateValueAndValidity();
  }

  return form;
}
