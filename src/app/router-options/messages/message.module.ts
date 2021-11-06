import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/@shared/shared.module';

import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessageComponent,
      },
    ]),
  ],
  declarations: [MessageComponent],
})
export class MessageModule {}

///https://blog.bitsrc.io/lazy-loading-auxiliary-routes-with-angular-why-and-how-9ceb2ddc6cae
