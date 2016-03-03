//React and friends (3rd party libs)
import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
//subcomponents
//Sass and assets 
import styles from './StoryModal.scss'

const modal = ({visable}) => (
    <Modal show={true} enforceFocus={false} className={styles.storyModal}>
        <Modal.Header className={styles.modalHeader}>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
        </Modal.Footer>
    </Modal>
);

const mapStateToProps = (state) => {
    return{
        visable: state.get("modalVisable")
    }
}

const StoryModal = connect(mapStateToProps)(modal); 
export default StoryModal;
