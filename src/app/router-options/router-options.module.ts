import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../@shared/shared.module';
import { RouterOptionsRoutingModule } from './router-options-routing.module';
import { TagsComponent } from './edit/tags/tags.component';
import { InfoComponent } from './edit/info/info.component';

@NgModule({
  imports: [CommonModule, RouterOptionsRoutingModule, SharedModule],
  declarations: [
    ListComponent,
    DetailsComponent,
    EditComponent,
    InfoComponent,
    TagsComponent,
  ],
})
export class RouterOptionsModule {}
