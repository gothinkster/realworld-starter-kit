import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'conduit-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
