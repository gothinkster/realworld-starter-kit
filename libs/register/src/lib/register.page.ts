import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AuthSelectors, Register } from '@realworld-angular-nx-ngxs/data-access';

@Component({
  selector: 'realworld-angular-nx-ngxs-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPage implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  errors$ = this.store.select(AuthSelectors.slices.errors);

  constructor(private store: Store) {}

  ngOnInit() {}

  signUp() {
    this.store.dispatch(new Register(this.form.value)).subscribe(() => {
      this.store.dispatch(new Navigate(['/home']));
    });
  }
}
