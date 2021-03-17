import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef  } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapsComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import {HttpModule } from '@angular/http';
import { LocationsService } from './services/locations/locations.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [HttpClientModule, HttpModule, LocationsService],
   declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
