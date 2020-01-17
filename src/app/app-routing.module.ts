import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddCategoryComponent} from './components/add-category/add-category.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
