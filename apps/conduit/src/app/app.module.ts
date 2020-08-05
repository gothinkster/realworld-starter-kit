import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
