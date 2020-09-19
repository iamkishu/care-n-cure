import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ConsultationComponent } from './home-page/consultation/consultation.component';
import { MentalHealthComponent } from './home-page/mental-health/mental-health.component';
import { MeditationComponent } from './home-page/mental-health/meditation/meditation.component';
import { BrainGamesComponent } from './home-page/mental-health/brain-games/brain-games.component';
import { ConsultComponent } from './home-page/mental-health/consult/consult.component';
import { DiagnosticsComponent } from './home-page/diagnostics/diagnostics.component';
import { XrayComponent } from './home-page/diagnostics/xray/xray.component';
import { CovidComponent } from './home-page/diagnostics/covid/covid.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: 'login', component: LoginComponent },
   { path: 'home-page', component: HomePageComponent },
   { path: 'consultation', component: ConsultationComponent },
   { path: 'mental-health', component: MentalHealthComponent },
   { path: 'meditation', component: MeditationComponent },
   { path: 'brain-games', component: BrainGamesComponent },
   { path: 'consult', component: ConsultComponent},
   { path: 'diagnostics', component: DiagnosticsComponent},
   { path: 'xray', component: XrayComponent},
   { path: 'covid', component: CovidComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
