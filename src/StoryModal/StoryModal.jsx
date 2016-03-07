//React and friends (3rd party libs)
import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
//subcomponents
//Sass and assets 
import styles from './StoryModal.scss';
//modal we are using is a bit strange, need to inline styles 
//react-modal to work properly
import {customModalStyles} from './CustomModalStyles.js';

const modal = ({visable, story, closeModal}) => (
    <Modal  isOpen={visable} 
            onRequestClose={closeModal} 
            style={customModalStyles}>
        <div className={styles.storyModalCloseButton} onClick={closeModal}></div>
        <div className={styles.storyModal}>
            <div className={styles.storyModalHeadline}>{story.title}</div>
            <img className={styles.storyModalImage} src={story.image}></img>
            <div className={styles.storyModalBody}>{story.text}</div>
        </div>
    </Modal>
);

const mapStateToProps = (state) => {
    return{
        visable: state.get("modalVisable"),
        story: state.get("activeStory")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch({
                type: 'HIDE_MODAL'
            })
        }
    }
}

const StoryModal = connect(mapStateToProps, mapDispatchToProps)(modal); 
export default StoryModal;
