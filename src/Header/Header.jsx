//React and friends (3rd party libs)
import React from 'react';
//subcomponents
//Sass and assets 
import styles from './Header.scss'
import globalStyles from '../Toolbox/global.scss'

export default React.createClass({
    render: function() {
        return (
            <div className={styles.main}> 
                <div className={styles.header}>
                    Global News
                </div>
                <div className={styles.tiny}>
                    World News for Sunday March 6, 2050
                </div>
                <div className={styles.list}>
                    <ul>
                        <li>
                            <span className={styles.special}>In The News</span>
                        </li>
                        <li>Finance</li>
                        <li>Water</li>
                        <li>War</li>
                        <li>Health</li>
                        <li>Refugees</li>
                        <li>Technology</li>
                        <li>Energy</li>
                    </ul>
                </div>
            </div>
        );
    }
});
