import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { LoadTags } from './+state/tags.actions';
import { TagsSelectors } from './+state/tags.selectors';

@Component({
  selector: 'conduit-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnInit {
  @Select(TagsSelectors.getTags) tags$: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadTags());
  }
}
