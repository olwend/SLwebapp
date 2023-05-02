
import React from 'react'

import { Container } from 'react-bootstrap'

import { CheckCircleIcon,  XCircleIcon } from "@primer/octicons-react";

export function sessionFormatter(cell, row) {
    if (cell.length > 0) {
      return <Container style={{color: 'green'}}><CheckCircleIcon style={{color: 'red'}} size={24} /></Container>
    } else {
      return <Container style={{color: 'red'}}><XCircleIcon size={24} /></Container>
    }
}

export function enabledFormatter(cell, row) {
    if (cell) {
      return <Container style={{color: 'green'}}><CheckCircleIcon style={{color: 'red'}} size={24} /></Container>
    } else {
      return <Container style={{color: 'red'}}><XCircleIcon size={24} /></Container>
    }
}

export function statusFormatter(cell, row) {
    if (cell === "CONFIRMED") {
      return <Container style={{color: 'green'}}><CheckCircleIcon style={{color: 'red'}} size={24} /></Container>
    } else {
      return <Container style={{color: 'red'}}><XCircleIcon fill='green' size={24} /></Container>
    }
}

export const arrayFormatter = (cell, row) => {
    if (cell.length > 0) {
      try {
        return cell.map(a => a.groupName).sort().join(',')
      } catch (error) {
        console.log(error)
      }
    } else {
      return "N/A"
    }
}