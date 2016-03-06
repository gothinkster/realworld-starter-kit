//React and friends (other 3rd party libs)
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import {INITIAL_STATE} from './actions/actionCreator.js';
//App components
import Header from './Header/Header.jsx';
import StoriesContainer from './StoriesContainer/StoriesContainer.jsx';
import StoryModal from './StoryModal/StoryModal.jsx';
//Scss (webpacked)
require('./Toolbox/global.scss');
import styles from './index.scss';
//Test component
import {stories} from './testAssets/stories.js';
import DevTools from './Toolbox/DevTools.jsx'


const store=createStore(reducer, INITIAL_STATE, DevTools.instrument());

store.dispatch({
    type: 'SET_STORIES',
    stories: stories
});

const AppContainer = () => (
    <div className={styles.appContainer}>
        <Header />
        <StoriesContainer />
        <StoryModal />
    </div>
);

render(
    <Provider store={store}>
        <div>
            <AppContainer />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('app')
)
