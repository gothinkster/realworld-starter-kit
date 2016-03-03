import {List, Map} from 'immutable';

export function setStories(state, stories){
    return state.set('stories', stories);
}

export function showModal(state){
    return state.set('modalVisable', true);
}

export function hideModal(state){
    return state.set('modalVisable', false);
}

export const INITIAL_STATE = Map({
    "modalVisable": false,
    "stories": List()
});
