import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RoutingModule } from './routing.module';
import { DataAccessModule } from '@realworld-angular-nx-ngxs/data-access';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false
      },
      executionStrategy: NoopNgxsExecutionStrategy
    }),
    DataAccessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
