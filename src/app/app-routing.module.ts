import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AdminComponent} from "./container/admin/admin.component";
import {AuthGuard} from "./guards/auth.guards";

const routes: Routes = [
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "admin", pathMatch: "full" },
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "404", component: NotFoundComponent},
  {path: "**", redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
