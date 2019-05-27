import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

export class User {
  name: string;
  email: string;
  birthDate: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dateFormat = 'dd/MM/yyyy';
  form: FormGroup;
  user = new User();
  collapsed = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.user.name = 'Marcelo Martins';
    this.user.email = 'm.a.martins@live.com';
    this.user.birthDate = new Date(1974, 6, 12);
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      birthDate: [null, Validators.required]
    });

    this.form.patchValue(this.user);
  }

  onSubmit() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    this.user = this.form.value;
    console.log(JSON.stringify(this.user));
    console.log(this.diagnostic);
    console.log(this.form.valid);
    console.log(this.form.get('name').hasError('required'));
    console.log(this.user.birthDate.toISOString());
  }

  toggle(): boolean {
    return this.collapsed = !this.collapsed;
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get birthDate(): AbstractControl {
    return this.form.get('birthDate');
  }

  get diagnostic() {
    return JSON.stringify(this.form.value);
  }
}
