import React, { useState, useEffect } from 'react'
import { Tab } from 'react-bootstrap'
import Iframe from 'react-iframe'

import { useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'

import NoDataIndication from './NoDataIndication'

import { baseFetchData, populateBaseTabs } from '../utils/iframes'

import './BaseListIframes.css'

const BaseListIframes = () => {

    const sessionInfo = useSelector(getSession)

    const [tabs, setTabs] = useState(populateBaseTabs(sessionInfo))

    let isDelayedRefreshAlreadyActivated = false
    let currentRefreshNumber = 1

    useEffect(() => {
        baseFetchData(sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            { tabs.map(_ => {
                return(
                    <Tab.Pane key={'base:' + _.port + '-' + _.key} className="full-size-no-padding" eventKey={'base:' + _.port}>
                        { sessionInfo.isLabRunning && _.available ? <Iframe id="theia" className="full-size-no-padding" url={_.url}/> : <div className={'no-data-indication'}><NoDataIndication /></div> }
                    </Tab.Pane>
                )
            })}
        </>
    )
}

export default BaseListIframes
