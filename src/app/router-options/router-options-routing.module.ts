import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsFormvalidGuard } from '../@core/@guard/is-form-valid/is-formvalid.guard';
import { ProductResolver } from './@core/@resolvers/product/product-resolver.service';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './edit/info/info.component';

import { TagsComponent } from './edit/tags/tags.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
    resolve: { resolvedProductData: ProductResolver },
  },
  {
    path: ':id/edit',
    component: EditComponent,
    resolve: { resolvedProductData: ProductResolver },
    canDeactivate: [IsFormvalidGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: InfoComponent },
      { path: 'tags', component: TagsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouterOptionsRoutingModule {}
