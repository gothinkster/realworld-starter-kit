//React and friends (3rd party libs)
import React from 'react';
//subcomponents
//Sass and assets
import styles from './HelloWorld2.scss';

export default React.createClass({
    render: function() {
        return (
            <div className={styles.helloWorld}>
                <h1>Hello World 2</h1>
            </div>
        );
    }
});
