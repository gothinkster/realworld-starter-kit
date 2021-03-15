import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthSelectors } from '@realworld-angular-nx-ngxs/data-access';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Select(AuthSelectors.loggedIn) loggedIn$: Observable<boolean>;
  @Select(AuthSelectors.loggedOut) loggedOut$: Observable<boolean>;
  @Select(AuthSelectors.username) username$: Observable<string>;

  constructor() {}
}
