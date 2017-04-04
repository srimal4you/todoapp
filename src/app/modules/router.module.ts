import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from '../components/todo/todo.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [ AuthGuard ] },
  { path: 'dashboard',  component: TodoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}