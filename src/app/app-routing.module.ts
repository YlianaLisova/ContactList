import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {ContactComponent} from "./components/contact/contact.component";
import {FilterPageComponent} from "./components/filter-page/filter-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'contacts', pathMatch: 'full'},
      {path: 'contacts', component: ContactsComponent},
      {path: 'contacts/:id', component: ContactComponent},
      {path: 'filter', component: FilterPageComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
