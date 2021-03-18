import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ConduitApiService } from '@realworld-angular-nx-ngxs/data-access';

import { LoadTags } from './tags.actions';

@State<string[]>({
  name: 'tags',
  defaults: []
})
@Injectable()
export class TagsState {
  constructor(private conduitApi: ConduitApiService) {}

  @Action(LoadTags)
  loadTags({ setState }: StateContext<string[]>) {
    return this.conduitApi.getTags().pipe(tap((tags) => setState(tags)));
  }
}
