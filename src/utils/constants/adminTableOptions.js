import React from 'react'

import { arrayFormatter, statusFormatter, sessionFormatter } from '../admin'
import ToggleButton from '../../components/ToggleButton'
import GroupSelect from '../../components/GroupSelect'

export const expandRow = {
    renderer: row => row.session.length > 0 ? (
        <div>
            <p>{ `Lab Name: ${row.session[0].labName}` }</p>
            <p>{ `Time Remaining: ${(((row.session[0].startDateTime + row.session[0].timer.value* 60 * 1000) - Date.now()) / 60000).toFixed(0)} Minutes` }</p>
        </div>
    ) : (
        <div>
            <p>No session is active!</p>
        </div>
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
};

export const columns = (groups) => [
    { text: 'Name', dataField: 'Attributes.2.Value', sort:true, style: {verticalAlign: 'middle'} },
    { text: 'Email', dataField: 'Attributes.3.Value', sort:true, style: {verticalAlign: 'middle'} },
    { text: 'Created', dataField: 'UserCreateDate', sort:true, style: {verticalAlign: 'middle'} },
    { text: 'Groups', dataField: 'group', formatter: (cell, row ) => <GroupSelect row={row} cell={cell} groups={groups} />, style: {'whiteSpace': 'nowrap'} },
    { text: 'Account Confirmed', dataField: 'UserStatus', formatter: statusFormatter, sortValue: statusFormatter,  sort:true, style: {whiteSpace: 'nowrap', textAlign: 'center'}, headerStyle: (colum, colIndex) => {return { width: '5%', textAlign: 'left', whiteSpace: 'nowrap' };} },
    { text: 'Account Enabled', dataField: 'Enabled', formatter: (cell, row) =>  <ToggleButton row={row} cell={cell} />, style: {whiteSpace: 'nowrap', textAlign: 'center'} , headerStyle: (colum, colIndex) => {return { width: '5%', textAlign: 'left', whiteSpace: 'nowrap' };}},
    { text: 'Active Session', dataField: 'session', formatter: sessionFormatter, sortValue: arrayFormatter, sort:true, style: {whiteSpace: 'nowrap', textAlign: 'center'} , headerStyle: (colum, colIndex) => {return { width: '5%', textAlign: 'left', whiteSpace: 'nowrap' };}},
  ]