import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormArray,
} from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class DcValidation {
  static logValidationErrors(
    group: FormGroup,
    formErrors?: any,
    validationMessages?: any,
    errorMessages?: any[]
  ): any[] {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      debugger;
      formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = validationMessages[key];

        errorMessages = [];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            const errorValue = messages[errorKey];
            const errorObject = {
              key: errorKey,
              value: errorValue,
              status: true,
            };
            errorMessages.push(errorObject);

            formErrors[key] += messages[errorKey] + ' ';
          }
        }

        if (abstractControl instanceof FormArray) {
          for (const control of abstractControl.controls) {
            if (control instanceof FormGroup) {
              this.logValidationErrors(control, '', control.controls);
            }
          }
        }
      }
      if (abstractControl.errors === null) {
        errorMessages = [];
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      // We need this additional check to get to the FormGroup
      // in the FormArray and then recursively call this
      // logValidationErrors() method to fix the broken validation
    }, this);
    return errorMessages;
  }

  public static passwordValidatorHasStrong(
    control: FormControl
  ): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      // return what´s not valid
      return { hasStrong: true };
    }
    return null;
  }

  public static passwordValidatorHasNumber(
    control: FormControl
  ): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    const valid = hasNumber;
    if (!valid) {
      // return what´s not valid
      return { hasNumber: true };
    }
    return null;
  }

  public static passwordValidatorHasUpper(
    control: FormControl
  ): ValidationResult {
    let hasUpper = /[A-Z]/.test(control.value);
    const valid = hasUpper;
    if (!valid) {
      // return what´s not valid
      return { hasUpper: true };
    }
    return null;
  }

  public static passwordValidatorHasLower(
    control: FormControl
  ): ValidationResult {
    let hasLower = /[a-z]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasLower;
    if (!valid) {
      // return what´s not valid
      return { hasLower: true };
    }
    return null;
  }

  public static passwordValidatorHasSpecialCharacter(
    control: FormControl
  ): ValidationResult {
    let hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasSpecialCharacter;
    if (!valid) {
      // return what´s not valid
      return { hasSpecialCharacter: true };
    }
    return null;
  }

  static MatchPassword(AC: AbstractControl): any {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      //console.log('false');
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      // console.log('true');
      return null;
    }
  }
}
