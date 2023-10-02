import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  greeting = {'id': 'XXX', 'content': 'Hello World'};

  logout(){
    console.log('Hi');
  }
}
