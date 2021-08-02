import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from 'src/app/model/IUser';
import { UserService } from 'src/app/services/user.service';
import Validation from 'utils/validation';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user!: IUser;
  form!: FormGroup;
  submitted = false; // this property helps us to check whether the form is submitted or not.

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        userName: [
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

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      //  this.user = Object.assign(this.user, this.form.value);
        this.userService.addUser(this.userData());
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  userData(): IUser {

    return this.user = {
      fullName: this.fullName.value,
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,

    }
  }
   // ------------------------------------
    // Getter methods for all form controls
    // ------------------------------------
   get fullName() {
      return this.form.get('fullName') as FormControl;
  }
  get userName() {
      return this.form.get('userName') as FormControl;
  }

  get email() {
      return this.form.get('email') as FormControl;
  }
  get password() {
      return this.form.get('password') as FormControl;
  }
  get confirmPassword() {
      return this.form.get('confirmPassword') as FormControl;
  }

  // ---------------------

}
