import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AuthSelectors, Login } from '@realworld-angular-nx-ngxs/data-access';

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
  errors$ = this.store.select(AuthSelectors.slices.errors);

  constructor(private store: Store) {}

  ngOnInit() {}

  login() {
    this.store.dispatch(new Login(this.form.value)).subscribe(() => {
      this.store.dispatch(new Navigate(['/home']));
    });
  }
}
