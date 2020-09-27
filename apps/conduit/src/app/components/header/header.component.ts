import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '@realworld-angular-nx-ngxs/data-access';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn$ = this.store.select(AuthSelectors.loggedIn);
  loggedOut$ = this.store.select(AuthSelectors.loggedOut);
  username$ = this.store.select(AuthSelectors.username);

  constructor(private store: Store) {}

  ngOnInit() {}
}
