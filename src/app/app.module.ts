import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BrandsComponent } from './landing/components/brands/brands.component';
import { AboutUsComponent } from './landing/components/about-us/about-us.component';
import { ReturnPolicyComponent } from './landing/components/return-policy/return-policy.component';
import { HomeComponent } from './landing/components/home/home.component';
import { HeaderComponent } from './landing/components/home/header/header.component';
import { FooterComponent } from './landing/components/home/footer/footer.component';
import { BodyComponent } from './landing/components/home/body/body.component';
import { MenuComponent } from './landing/components/home/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BrandsComponent,
    AboutUsComponent,
    ReturnPolicyComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
