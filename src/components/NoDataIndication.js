import React from 'react'

import { Container, Spinner } from 'react-bootstrap'

const NoDataIndication = () => (
    <Container className="text-center"> 
      <Spinner animation="grow" /> 
      <Spinner animation="grow" /> 
      <Spinner animation="grow" />
    </Container>
  )

export default NoDataIndication
