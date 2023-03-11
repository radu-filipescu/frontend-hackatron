import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ChatgptComponent } from './shared/chatgpt/chatgpt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadMorePageComponent } from './pages/read-more-page/read-more-page/read-more-page.component';
import { SimulationPageComponent } from './pages/simulation-page/simulation-page.component';
import { FormsModule } from '@angular/forms';
import { NetworkNodeComponent } from './pages/simulation-page/network-node/network-node.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent,
    ChatgptComponent,
    ReadMorePageComponent,
    SimulationPageComponent,
    NetworkNodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
