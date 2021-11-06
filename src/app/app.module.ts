import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './@block/@root/app.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from './@shared/shared.module';
import { BlockModule } from './@block/block.module';
import { CoreModule } from './@core/core.module';
import { UserModule } from './router-options/user/user.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BlockModule,
    CoreModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
