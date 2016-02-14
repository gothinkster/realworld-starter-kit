//React and friends (3rd party libs)
import React from 'react';
import {List} from 'immutable';
//subcomponents
import StoryBox from './StoryBox/StoryBox.jsx'
//Sass
import styles from './StoriesContainer.scss'
import globalStyles from '../Toolbox/global.scss'

export default React.createClass({
    render: function() {
        console.log(this.props.stories)
        const stories = List(this.props.stories)
        return (
            <div className={styles.StoriesContainer}>
                {stories.map(story =>
                   <StoryBox story={story}/>
                )}
            </div>
        );
    }
});
