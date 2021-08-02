import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {


  form!: FormGroup;
  submitted = false; // this property helps us to check whether the form is submitted or not.
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        propName: ['', Validators.required],
        address: ['',
         [
          Validators.required,
          Validators.minLength(6)
          ]
         ],
        propType: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],
        price: ['', Validators.required],
       images: ['',]

      },
      {
        //validators: [Validation.match('password', 'confirmPassword')] //validation is our
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
