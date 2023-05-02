import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const AlertModal = props =>
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { props.err ? props.err.header : '' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          { props.err ? props.err.message : '' }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.onHide }>Close</Button>
      </Modal.Footer>
    </Modal>

export default AlertModal
