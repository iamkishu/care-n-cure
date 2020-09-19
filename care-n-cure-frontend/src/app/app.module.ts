import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from './_modal';

import { HttpClientModule } from '@angular/common/http';
import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { ConsultationComponent } from './home-page/consultation/consultation.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { MentalHealthComponent } from './home-page/mental-health/mental-health.component';
import { MeditationComponent } from './home-page/mental-health/meditation/meditation.component';
import { BrainGamesComponent } from './home-page/mental-health/brain-games/brain-games.component';
import { ConsultComponent } from './home-page/mental-health/consult/consult.component';
import { DiagnosticsComponent } from './home-page/diagnostics/diagnostics.component';
import { XrayComponent } from  '././home-page/diagnostics/xray/xray.component';
import { CovidComponent } from './home-page/diagnostics/covid/covid.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    ConsultationComponent,
    MentalHealthComponent,
    MeditationComponent,
    BrainGamesComponent,
    ConsultComponent,
    DiagnosticsComponent,
    XrayComponent,
    CovidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
     MatDialogModule,
     ModalModule,
     HttpClientModule,
     BrowserAnimationsModule, // required animations module
     ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
