import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ReadMorePageComponent } from './pages/read-more-page/read-more-page/read-more-page.component';
import { SimulationPageComponent } from './pages/simulation-page/simulation-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'readmore', component: ReadMorePageComponent },
  { path: 'simulation', component: SimulationPageComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
