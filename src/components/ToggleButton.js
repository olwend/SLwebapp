import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import { apiFnc } from '../utils'

import { destroyLabSession } from '../utils/lab'
import { updateUserSettings } from '../utils/aws'

const ToggleButton = props => {

  const [checked, setChecked] = useState(props.cell);
  const [unactive, setUnactive] = useState(false);

  const enableDisableUser = async (action, userId) => {
    let body = {
      action: action,
      userId: userId
    }
    await updateUserSettings(body);
  }

  const handleToggleChange = async (value) => {
    setUnactive(true);
    setChecked(value);

    // we already disable user so need to check active sessions and stops it
    try {
      if(!value){
        if(props.row.session.length > 0){
          apiFnc(destroyLabSession(null, props.row.session[0].uuid, props.row.session[0].taskId), "Problem with Destroy Lab", "There is some problems with Destroy Lab, please refresh page or try it later.")
        }
      }
    } catch (error) {
      console.error(error);
    }

    try {
      if(value) {
        await enableDisableUser("enable",props.row.Username);
      }
      else {
        await enableDisableUser("disable",props.row.Username);
      }
    } catch (error) {
      console.error(error);
      //rollback setting of toggle if enable/disable user goes wrong
      setChecked(!value);
      setUnactive(false);
      return;
    }
    
    try {
      if(!value){
        // api calls signOff for user on all devices
        await enableDisableUser("signOut",props.row.Username);
      }
    } catch (error) {
      console.error(error);
    }
    setUnactive(false);
  }

  return <Form>
      <Form.Check 
        type="switch"
        id={props.row.Username}
        label=""
        disabled={unactive}
        checked={checked}
        onChange={(e) => handleToggleChange(!checked)}
      />
    </Form>
}

export default ToggleButton
