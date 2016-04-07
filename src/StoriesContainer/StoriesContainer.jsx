//React and friends (3rd party libs)
import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/actionCreator.js'
//subcomponents
import StoryBox from './StoryBox/StoryBox.jsx'
//Sass
import styles from './StoriesContainer.scss'

const StoriesList = ({stories, onClick}) => (
    <div className={styles.StoriesContainer}>
        {stories.map((story,i) =>
            <StoryBox key={i} story={story} onClick={() => onClick(story)}/>
        )}
    </div>
);

const mapStateToProps = (state) => {
    console.log('state', state);
    return {stories: state.get('stories')}
};

/*const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (story) => {
            dispatch({
                type: 'SHOW_MODAL',
                story: story
            })
        }
    }
*/

const StoriesContainer = connect(mapStateToProps)(StoriesList);

export default StoriesContainer;
