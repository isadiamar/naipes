import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDialogModule} from "@angular/material/dialog";

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {PlayComponent} from './play/play.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './dialog/dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from './register/register.component';
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoginComponent} from './login/login.component';
import {RecordsComponent} from './records/records.component'
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,
    PlayComponent,
    DialogComponent,
    RegisterComponent,
    LoginComponent,
    RecordsComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
