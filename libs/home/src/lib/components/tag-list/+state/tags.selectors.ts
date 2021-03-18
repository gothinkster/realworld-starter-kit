import { Selector } from '@ngxs/store';

import { TagsState } from './tags.state';

export class TagsSelectors {
  @Selector([TagsState])
  static getTags(state: string[]) {
    return state;
  }
}
