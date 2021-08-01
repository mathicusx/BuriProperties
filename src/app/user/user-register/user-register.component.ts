import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Validation from 'utils/validation';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  form!: FormGroup;
  submitted = false; // this property helps us to check whether the form is submitted or not.

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')] //validation is our
      }
    );
  }
  get f(): { [key: string]: AbstractControl } { // this is a simple getter function to make code smaller and more readable
    // example instead of form.controls.username we can use f.username
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
// registrationForm!: FormGroup; // FormGroup is a class to organize and manage the relative Form Control.
  // submitted = false;

  // constructor() { }

  // ngOnInit() {
  //   this.registrationForm = new FormGroup({
  //     userName: new FormControl(null, Validators.required),
  //     email: new FormControl(null,[Validators.required, Validators.email]),
  //     password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  //     confirmPassword: new FormControl(null, Validators.required)
  //   }, this.passwordMatchingValidator); // our password matching validator.
  // }

  // passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
  //   //if a condition is valid it should return a JsObject with key:value
  //   return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
  //     { notmatched: true } // if passwords dont match.
  // };
  //   //getter methods for all Form Controls
  //   get userName() {
  //     return this.registrationForm.get('userName') as FormControl;
  //   }
  //   get email() {
  //     return this.registrationForm.get('email') as FormControl;
  //   }
  //   get password() {
  //     return this.registrationForm.get('password') as FormControl;
  //   }
  //   get confirmPassword() {
  //     return this.registrationForm.get('confirmPassword') as FormControl;
  //   }
  // onSubmit(): void {
  //   this.submitted = true;
  //   console.log(this.registrationForm);
  // }
  // onReset(): void {
  //   this.submitted = false;
  //   this.registrationForm.reset();
  // }
  // userSubmitted() {

  // }
