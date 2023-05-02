import React from 'react'

import { Modal, ModalHeader, ModalBody, Progress } from 'reactstrap'

const LoadingModal = (props) => (
  <Modal isOpen={props.dpgLoading}>
    <ModalHeader>Labs Setup</ModalHeader>
    <ModalBody className="mb-3">
      <div className="progress-container">
        <Progress max="100" value={props.pbValue}>
          <span className="progress-value" style={{fontSize: "10px"}}>{props.pbValue}%</span>
        </Progress>
      </div>
    </ModalBody>
  </Modal>
);


export default LoadingModal
