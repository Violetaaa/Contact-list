import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
// Para cambiar el formato de fecha Mat-Datepicker a DD / MM / YYYY
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person/person.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  MatListModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }], // Para cambiar el formato de fecha Mat-Datepicker a DD / MM / YYYY
  bootstrap: [AppComponent]
})
export class AppModule { }
