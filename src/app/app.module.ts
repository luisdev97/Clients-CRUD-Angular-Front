import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './clients/client.service';
import { RouterModule , Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { LoginComponent } from './users/login.component';
import { AuthGuard } from './users/guards/auth.guard';
import { RoleGuard } from './users/guards/role.guard';
import { tokenInterceptor } from './users/interceptors/token.interceptor';
import { AuthInterceptor } from  './users/interceptors/auth.interceptor';

registerLocaleData(localeEn, 'en');

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'home' , redirectTo: '/clients' , pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/page/:page', component: ClientsComponent },
  { path: 'clients/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN'}},
  { path: 'clients/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN'}},
  { path: 'login', component: LoginComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    ClientsDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule, MatDatepickerModule, MatMomentDateModule
  ],
  providers: [ClientService, 
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent] 
})
export class AppModule { }
