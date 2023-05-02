import React from 'react'

import { Nav } from 'react-bootstrap'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ClippyIcon, LinkExternalIcon } from '@primer/octicons-react'

import { useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'

const BaseListObjects = () => {

    const sessionInfo = useSelector(getSession)

    return sessionInfo.session.basePorts.map((v, i) => {
        let baseUrl = 'https://' + sessionInfo.session.uuid + '-base' + v.port + '.sessions.' + process.env.REACT_APP_URL
        if ( v.visible === true)
            return <Nav.Item className="flex" key={i}>
                <Nav.Link eventKey={'base:' + v.port}>base:{v.port}</Nav.Link>
                <CopyToClipboard text={baseUrl}>
                    <Nav.Link className="px-0"><ClippyIcon size={18}/></Nav.Link>
                </CopyToClipboard>
                <Nav.Link className="px-0 pl-2" href={baseUrl} target="_blank"><LinkExternalIcon  size={18}/></Nav.Link>
            </Nav.Item>
        else return null
    })
}

export default BaseListObjects
