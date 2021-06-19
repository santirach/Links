import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { AbstractStorage } from './shared/services/storage/abstract-storage';
import { StorageService } from './shared/services/storage/storage.service';
import { AuthenticationGuard } from './shared/guards/authentication.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: AbstractStorage, useClass: StorageService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
