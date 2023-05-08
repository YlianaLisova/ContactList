import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './components/header/header.component';
import {ContactComponent} from './components/contact/contact.component';
import {SearchComponent} from './components/search/search.component';
import {SearchPipe} from './common/search.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {FilterPageComponent} from './components/filter-page/filter-page.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'contacts', pathMatch: 'full'},
      {path: 'contacts', component: ContactsComponent},
      {path: 'contacts/:id', component: ContactComponent},
      {path: 'filter', component: FilterPageComponent},
    ]
  },
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    MainLayoutComponent,
    HeaderComponent,
    ContactComponent,
    SearchComponent,
    SearchPipe,
    FilterPageComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ContactsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
