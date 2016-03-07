import {setStories, showModal, hideModal} from '../actions/actionCreator';
export default function reducer(state, action) {
    switch(action.type){
        case 'SET_STORIES':
            return setStories(state, action.stories);
        case 'SHOW_MODAL':
            return showModal(state, action.story);
        case 'HIDE_MODAL':
            return hideModal(state);
        default:
            return state;
    }
} 
