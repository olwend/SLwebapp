import React from 'react'

import { Nav } from 'react-bootstrap'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ClippyIcon, LinkExternalIcon } from '@primer/octicons-react'

import { useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'

const LabsListObjects = () => {
    const sessionInfo = useSelector(getSession);
    try {
        return sessionInfo.session.cDef.map(v =>
            v.ports.map((a, i) => {
                let serviceUrl = 'https://' + sessionInfo.session.uuid + '-' + v.shortName + a.port + '.sessions.' + process.env.REACT_APP_URL
                if (a.visible === true)
                    return <Nav.Item className="flex" key={i}>
                        <Nav.Link eventKey={v.shortName + ':' + a.port}>{v.shortName}:{a.port}</Nav.Link>
                        <CopyToClipboard text={serviceUrl}>
                            <Nav.Link className="px-0"><ClippyIcon size={18} /></Nav.Link>
                        </CopyToClipboard>
                        <Nav.Link className="px-0 pl-2" href={serviceUrl} target="_blank"><LinkExternalIcon size={18} /></Nav.Link>
                    </Nav.Item>
                else return null
            })
        )
    } catch (err) {
        return null
    }
}

export default LabsListObjects
