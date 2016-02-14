import {setStories, INITIAL_STATE} from '../actions/actionCreator';
export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'SET_STORIES':
            return setStories(state, action.stories);
        default:
            return state;
    }
} 
