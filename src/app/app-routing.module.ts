import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PreferencesComponent} from "./preferences/preferences.component";
import {PlayComponent} from "./play/play.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {RecordsComponent} from "./records/records.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'play', component: PlayComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'records', component: RecordsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
