import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ValidationService } from 'src/app/@core/@services/@validation/validation.service';
import { CustomeValidation } from 'src/app/@core/@utilites/@validation/custome.validation';
import { EmployeeService } from '../@core/@services/employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form: FormGroup;

  validationMessages: any = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.',
    },
    email: {
      required: 'Email is required.',
      emailDomain: 'Email domian should be pragimtech.com',
    },
    confirmEmail: {
      required: 'Confirm Email is required.',
    },
    emailGroup: {
      emailMismatch: 'Email and Confirm Email do not match.',
    },
    phone: {
      required: 'Phone is required.',
    },
    password: {
      required: 'Password is required.',
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      mismatch: 'Password and Confirm Password do not match',
    },
  };
  formErrors = {} as any;
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(10),
          ],
        ],
        Email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validationService.regex.email),
          ],
        ],
        contactPreference: ['email'],
        email: ['', [Validators.required]],
        emailGroup: this.fb.group(
          {
            email: ['', [Validators.required, CustomeValidation.emailDomain]],
            confirmEmail: ['', [Validators.required]],
          },
          { validator: CustomeValidation.matchEmails }
        ),
        phone: [''],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        skills: this.fb.array([this.addSkillFormGroup()]),
      },
      {
        validator: this.validationService.matchConfirmItems(
          'password',
          'confirmPassword'
        ),
      }
    );
    this.form.valueChanges.subscribe((data) => {
      this.logValidationErrors();
    });

    this.form
      .get('contactPreference')
      .valueChanges.subscribe((data: string) => {
        this.onContactPrefernceChange(data);
      });

    // this.route.paramMap.subscribe((params) => {
    //   const empId = +params.get('id');
    //   if (empId) {
    //     this.getEmployee(empId);
    //   }
    // });

    // this.getEmployee(1);
  }

  onSubmit() {
    const formData = this.form.value;
    console.log(formData);
  }
  logValidationErrors() {
    this.formErrors = this.validationService.getValidationErrors(
      this.form,
      this.validationMessages
    );
  }

  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.form.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators([
        Validators.required,
        Validators.maxLength(2),
      ]);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  get skillsControls(): any {
    return (<FormArray>this.form.get('skills')).controls;
  }
  addSkillButtonClick(): void {
    (<FormArray>this.form.get('skills')).push(this.addSkillFormGroup());
  }
  removeSkillGroup(index: number): void {
    const skillsFormArray = <FormArray>this.form.get('skills');
    skillsFormArray.removeAt(index);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  ///
  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: any) => {
        debugger;
        this.editEmployee(employee);
      },
      (err: any) => console.log(err)
    );
  }
  ///---------------------------------------------
  editEmployee(employee: any) {
    debugger;
    this.form.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
      phone: employee.phone,
    });
    this.form.setControl('skills', this.setExistingSkills(employee.skills));
  }
  setExistingSkills(skillSets: any[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach((s) => {
      formArray.push(
        this.fb.group({
          skillName: s.skillName,
          experienceInYears: s.experienceInYears,
          proficiency: s.proficiency,
        })
      );
    });

    return formArray;
  }
}
