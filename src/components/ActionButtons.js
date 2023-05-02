import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/slices/userSlice'

import { Button, Container } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'

import { ChevronRightIcon, GearIcon, XCircleIcon } from '@primer/octicons-react'

import { task } from '../model/task'
import { user } from '../model/user'

import { deleteLab } from "../utils/lab"

const ActionButtons = props => {

    // DestroySessionModal states
    const userInfo = useSelector(getUser)

    const dispatch = useDispatch()

    const history = useHistory()

    const labActive = props.dataSession !== undefined ? props.dataSession.isLabActive : false

    return (
        <Container className="p-0" style={{ textAlign: 'center' }}>
            <Button variant="outline-success" disabled={labActive} onClick={() => { props.setDpgLoading(true); task.run(props.row, userInfo.userUuid, props.setPbValue, dispatch, props.setDpgLoading, props.setApiError, props.setShowError, history) }} data-cy="labs-runlab-button">
                <ChevronRightIcon />
            </Button>
            { user.isAdminOrDeveloper(userInfo, props.row) ? <>
                <Button variant="outline-warning" className="mx-3" as={Link} to={`/edititem/${props.row.uuid}`} data-cy="labs-editlab-button">
                    <GearIcon />
                </Button>
                <Button color="danger" onClick={() => {deleteLab(dispatch,props.row.uuid,props.row.labName); window.location.reload(false);}} data-cy="labs-deletelab-button">
                    <XCircleIcon /> Delete Lab
        </Button>
                {/* <Button variant="outline-danger"onClick={ () => {
                            apiFnc(deleteLab(dispatch,props.row.uuid,props.row.labName),
                                'Problem with Deleting Lab',
                                'There is some problems with Delete Lab, please refresh page or try it later.',
                                props.setApiError,
                                props.setShowError)}}>
                            <XCircleIcon/>
                        </Button> */}
            </> : null
            }
        </Container>
    )
}

export default ActionButtons
