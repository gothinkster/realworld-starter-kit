//React and friends (other 3rd party libs)
import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
//App components
import Header from './Header/Header.jsx';
import StoriesContainer from './StoriesContainer/StoriesContainer.jsx'
//Reducers
import reducer from './reducers/reducer'
//Scss (webpacked)
require('./Toolbox/global.scss');
import styles from './index.scss';
//Test component
import {stories} from './testAssets/stories.js';

const store=createStore(reducer);
store.dispatch({
    type: 'SET_STORIES',
    entries: require('./testAssets/stories.js')
})

const AppContainer = React.createClass({
    render: function(){
        return (
            <div className={styles.appContainer}>
                <Header />
                <StoriesContainer stories={stories}/>
            </div>
        );
    }

})

ReactDom.render(
    <AppContainer />,
    document.getElementById('app')
)
