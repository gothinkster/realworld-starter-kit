import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthSelectors, GetAuthUser, UpdateAuthUser } from '@realworld-angular-nx-ngxs/data-access';

@Component({
  selector: 'realworld-angular-nx-ngxs-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    bio: new FormControl(),
    image: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetAuthUser()).subscribe(() => {
      const user = this.store.selectSnapshot(AuthSelectors.slices.user);
      this.form.patchValue(user);
    });
  }

  updateSettings() {
    const authUser = this.form.value;
    this.store.dispatch(new UpdateAuthUser(authUser));
  }
}
