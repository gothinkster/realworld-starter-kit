//React and friends (3rd party libs)
import React from 'react';
//subcomponents
//Sass and assets 
import styles from './Header.scss'
import globalStyles from '../Toolbox/global.scss'

export default React.createClass({
    render: function() {
        return (
            <div className={styles.header}>
                Global News
            </div>
        );
    }
});
