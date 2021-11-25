import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormRoutingModule } from './reactive-form-routing.module';

import { SharedModule } from '../@shared/shared.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, ReactiveFormRoutingModule, SharedModule],
})
export class ReactiveFormModule {}
