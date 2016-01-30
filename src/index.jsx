//React and friends (other 3rd party libs)
import React from 'react';
import ReactDom from 'react-dom';
//App components
import HelloWorld from './HelloWorld/HelloWorld';
import HelloWorld2 from './HelloWorld2/HelloWorld2';
//Scss (webpacked)
require('./Toolbox/global.scss');
import styles from './index.scss';

const AppContainer = React.createClass({
    render: function(){
        return (
            <div className={styles.appContainer}>
                <HelloWorld className={styles.helloWorld}/>
                <HelloWorld2 className={styles.helloWorld2}/>
            </div>
        );
    }

})

ReactDom.render(
    <AppContainer />,
    document.getElementById('app')
)
