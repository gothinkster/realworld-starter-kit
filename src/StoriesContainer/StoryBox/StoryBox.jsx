//React and friends (3rd party libs)
import React from 'react';
import {List, Map} from 'immutable';
//subcomponents
//Sass and assets 
import styles from './StoryBox.scss'
import globalStyles from '../../Toolbox/global.scss'

const setStoryType = function(storyType){
    switch(storyType){
        case 'Headline':
            return styles.storyBoxHeadline;
        case 'Featured':
            return styles.storyBoxFeatured;
        default:
            return styles.storyBoxNormal;
    }
}
export default React.createClass({
    render: function() {
        const story = this.props.story;
        return (
            <div className={setStoryType(story.type)}>
                <h1>{story.title}</h1>
            </div>
        );
    }
});
