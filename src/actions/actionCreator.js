import {List, Map} from 'immutable';

export function setStories(state, stories){
    return state.set('stories', stories);
}

export function showModal(state, story){
    console.log('story blarg', story);
    return state
        .set('modalVisable', true)
        .set('activeStory', story);
}

export function hideModal(state){
    return state.set('modalVisable', false);
}

