import {setStories, showModal, hideModal, INITIAL_STATE} from '../actions/actionCreator';
export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'SET_STORIES':
            return setStories(state, action.stories);
        case 'SHOW_MODAL':
            return showModal(state);
        case 'HIDE_MODAL':
            return hideModal(state);
        default:
            return state;
    }
} 
