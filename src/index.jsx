//React and friends (other 3rd party libs)
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import {INITIAL_STATE} from './actions/initialState.js';
import getParameterByName from './Toolbox/getUrlParameterByName.js'
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

const QS_URL="https://iamadatapoint.com/example";
const store=createStore(reducer, INITIAL_STATE, DevTools.instrument());

//getting information from the server boilerplate
/*var userResponse;

var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200)
        userResponse = JSON.parse(httpRequest.responseText);
    else
    {
        console.log("ready state", httpRequest.readyState)
        console.log("response status", httpRequest.status)
    }
};

var userId = getParameterByName('userId');
httpRequest.open("GET", QS_URL, userId);
httpRequest.send();
*/
//end getting information from the server

store.dispatch({
    type: 'SET_STORIES',
    stories: stories[Math.floor((Math.random()*stories.length))]
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
