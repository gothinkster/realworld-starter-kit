import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { TagListModule } from './components/tag-list/tag-list.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: HomePage }]), TagListModule],
  declarations: [HomePage]
})
export class HomeModule {}
