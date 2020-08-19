import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { TagsState } from './+state/tags.state';
import { TagListComponent } from './tag-list.component';

const COMPONENTS = [TagListComponent];

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([TagsState])],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TagListModule {}
