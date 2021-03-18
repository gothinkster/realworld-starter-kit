import { createSelector, StateToken } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';

type SelectorOnly<TModel> = StateToken<TModel> | ((...arg: any) => TModel);

type Selector<TModel> = StateClass<any> | SelectorOnly<TModel>;

export type PropertySelectors<TModel> = {
  [P in keyof TModel]: (model: TModel) => TModel[P];
};

export function createPropertySelectors<TModel>(state: Selector<TModel>): PropertySelectors<TModel> {
  const cache: Partial<PropertySelectors<TModel>> = {};
  return new Proxy(
    {},
    {
      get(target: any, prop: string) {
        const selector = cache[prop] || createSelector([state], (s: TModel) => s?.[prop]);
        cache[prop] = selector;
        return selector;
      }
    }
  );
}

interface SelectorMap {
  [key: string]: SelectorOnly<any>;
}

type MappedSelector<T extends SelectorMap> = (...args: any[]) => MappedResult<T>;

type MappedResult<TSelectorMap> = {
  [P in keyof TSelectorMap]: TSelectorMap[P] extends SelectorOnly<infer R> ? R : never;
};

export function createMappedSelector<T extends SelectorMap>(selectorMap: T): MappedSelector<T> {
  const selectors = Object.values(selectorMap);
  return createSelector(selectors, (...args) => {
    return Object.keys(selectorMap).reduce((obj, key, index) => {
      (obj as any)[key] = args[index];
      return obj;
    }, {} as MappedResult<T>);
  }) as MappedSelector<T>;
}
