/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {SharesModule} from './shares/shares.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RequestInterceptor} from './@core/intercepters/request.interceptor';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig, SocialLoginModule,
} from 'angularx-social-login';
import {ToastrModule} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ListSupplierComponent } from './supplier/component/ListSupplier/ListSupplier.component';
import { ListCustomerComponent } from './customer/component/listCustomer/listCustomer.component';
import { CreateSupplierComponent } from './supplier/component/create-supplier/create-supplier.component';
import { CreateCustomerComponent } from './customer/component/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customer/component/update-customer/update-customer.component';
import { EditSupplierComponent } from './supplier/component/Edit-Supplier/Edit-Supplier.component';

const configToast: any = {
  timeOut: 2000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
  progressBar: true,
  progressAnimation: 'increasing',
};

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    ListSupplierComponent,
    ListCustomerComponent,
    EditSupplierComponent,
    CreateSupplierComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    SharesModule,
    NgbModule,
    SocialLoginModule,
    ToastrModule.forRoot(configToast),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RequestInterceptor,
    //   multi: true,
    // },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '569599946060-9s09k2ujflc4ar0p5fsml7t6d78i3a0v.apps.googleusercontent.com',
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('821640785131717'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  // exports: [
  //   TranslateModule,
  // ],
})
export class AppModule  {
}


