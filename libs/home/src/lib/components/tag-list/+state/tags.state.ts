import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { LoadTags } from './tags.actions';

@State<string[]>({
  name: 'tags',
  defaults: []
})
@Injectable()
export class TagsState {
  constructor() {}

  @Action(LoadTags)
  loadTags({ setState }: StateContext<string[]>) {
    setState(['angular', 'ngxs', 'vue', 'rx-angular']);
  }
}
