//React and friends (3rd party libs)
import React from 'react';
import {List, Map} from 'immutable';
//subcomponents
//Sass and assets 
import styles from './StoryBox.scss'
import globalStyles from '../../Toolbox/global.scss'

const getStoryStyles = function(storyType){
    switch(storyType){
        case 'Headline':
            return [
                    styles.storyBoxHeadline, 
                    styles.headlineImage,
                    styles.headlineTitle,
                    styles.headlineBlurbContainer,
                    styles.headlineBlurbText,
                    styles.headlineBlurbFadeover
            ];
        case 'Featured':
            return [
                    styles.storyBoxFeatured,
                    styles.featuredImage,
                    styles.featuredTitle,
                    styles.featuredBlurbContainer,
                    styles.featuredBlurbText,
                    styles.featuredBlurbFadeover
            ];
        default:
            return [
                    styles.storyBoxNormal,
                    styles.normalImage,
                    styles.normalTitle,
                    styles.normalBlurbContainer,
                    styles.normalBlurbText,
                    styles.fadeover
            ];
    }
}
export default React.createClass({
    render: function() {
        const story = this.props.story;
        return (
            <div className={getStoryStyles(story.type)[0]}>
                <div className={getStoryStyles(story.type)[1]}></div>
                <div className={getStoryStyles(story.type)[2]}>{story.title}</div>
                <div className={getStoryStyles(story.type)[3]}>
                    <div className={getStoryStyles(story.type)[4]}>{story.text}</div>
                    <div className={getStoryStyles(story.type)[5]}></div>
                </div>
            </div>
        );
    }
});
