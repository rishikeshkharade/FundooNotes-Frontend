import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuardService } from './Services/auth-guard/auth-guard.service';
import { ArchiveComponent } from './Components/archive/archive.component';
import { NotesComponent } from './Components/notes/notes/notes.component';
import { TrashComponent } from './Components/trash/trash.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService],
    children: [
      { path: '', component: NotesComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'trash', component: TrashComponent },
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegisterComponent, LoginComponent, DashboardComponent];
