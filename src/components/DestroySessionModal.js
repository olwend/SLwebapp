
import React from 'react'
import { useDispatch } from 'react-redux'
import { apiFnc } from '../utils'
import { destroyLabSession } from '../utils/lab'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const DestroySessionModal = props => {
  const dispatch = useDispatch()

  return (
    <Modal isOpen={props.show} toggle={props.handleClose}>
      <ModalHeader toggle={props.handleClose}>End this lab ?</ModalHeader>
      <ModalBody>Are you sure you want to end your current lab?</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          data-cy="end-lab-modal-yes-button"
          color="danger"
          onClick={() => {
            apiFnc(destroyLabSession(dispatch, props.sessionInfo.session.uuid));
            if (props.history) {
              props.history.push(props.history_path);
            }
          }}
        >
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default DestroySessionModal
