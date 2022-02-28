import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { JobAnnounceFormComponent } from './components/job-announce-form/job-announce-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts/:id', component: DetailViewComponent },
  { path: 'add-job', component: JobAnnounceFormComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
