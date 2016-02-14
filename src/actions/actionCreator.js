import {List, Map} from 'immutable';

export function setStories(state, stories){
    return state.set('stories', List(stories))
}

export const INITIAL_STATE = Map();
