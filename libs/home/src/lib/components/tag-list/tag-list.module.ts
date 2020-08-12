import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from './tag-list.component';

const COMPONENTS = [TagListComponent];

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TagListModule {}
