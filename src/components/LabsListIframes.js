import React, { useState, useEffect } from 'react'
import { Tab } from 'react-bootstrap'
import Iframe from 'react-iframe'

import { useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'

import NoDataIndication from './NoDataIndication'

import { populateTabs, labsFetchData } from '../utils/iframes'

import './LabsListIframes.css'

const LabsListIframes = () => {

    const sessionInfo = useSelector(getSession)

    const [tabs, setTabs] = useState(populateTabs(sessionInfo))

    let isDelayedRefreshAlreadyActivated = false
    let currentRefreshNumber = 1

    useEffect(() => {
        labsFetchData(sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
    <>
        { tabs.map(_ => {
            return(
                <Tab.Pane key={_.shortName + ':' + _.port + '-' + _.key} className="full-size-no-padding" eventKey={_.shortName + ':' + _.port}>
                    { sessionInfo.isLabRunning && _.available ? <Iframe id="theia" className="full-size-no-padding" url={_.url}/> : <div className={'no-data-indication'}><NoDataIndication /></div> }
                </Tab.Pane>
            )
        })}
    </>
    )
}

export default LabsListIframes
