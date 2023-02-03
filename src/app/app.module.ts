import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './components/header/header.component';
import {ContactComponent} from './components/contact/contact.component';
import {SearchComponent} from './components/search/search.component';
import {SearchPipe} from './common/search.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {FilterPageComponent} from './components/filter-page/filter-page.component';

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSelectModule
    ],
  providers: [ContactsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
