import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Login, AuthSelectors } from '@realworld-angular-nx-ngxs/data-access';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'conduit-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  errors$ = this.store.select(AuthSelectors.errors);

  constructor(private store: Store) {}

  ngOnInit() {}

  login() {
    this.store.dispatch(new Login(this.form.value)).subscribe(() => {
      this.store.dispatch(new Navigate(['/home']));
    });
  }
}
