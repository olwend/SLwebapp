import React, {useState, useEffect} from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import Select from "react-select";
import { updateUserSettings } from '../utils/aws'
import { PlusIcon  } from "@primer/octicons-react";

const GroupSelect = props => {
  const [ groups, setGroups ] = useState([]);
  const [ change, setChange ] = useState(false);
  const [ processing, setProcessing ] = useState(false); 

  useEffect(() => {
    const onLoad = async () => {
      let values = []
      props.cell.map(obj=>values.push({value: obj.groupName, label: obj.groupName}))
      setGroups(values);
    }
    onLoad()
  },[props])

  const handleStateChange = (newGroups, actualGroups) => {
    if (newGroups == null)
      setGroups([]);
    else
      setGroups(newGroups);
    let grp = [];
    actualGroups.map(obj=>grp.push({value: obj.groupName, label: obj.groupName}))
    if (JSON.stringify(newGroups) === JSON.stringify(grp)){
      setChange(false);
    }
    else {
      setChange(true);
    }

  }

  const groupUpdate = async (action, userId, grp) => {
    let body = {
      action: action,
      userId: userId,
      groups: grp
    }
    await updateUserSettings(body);
  }

  const handleUpdateGroups = async () => {
    setProcessing(true);
    let grp = [];

    if(groups.length > 0){
      groups.map(obj => grp.push(obj.value));
    }
    console.log(grp);
    try {
      await groupUpdate("updateUserGroups",props.row.Username, grp);
      setChange(false);
    } catch (error) {
      console.error(error);
    }
    setProcessing(false);
  }

  return <Form>
          <Form.Row className="align-items-center">
            <Col xs={10}>
              <Select
                isMulti
                value={groups}
                options={props.groups}
                closeMenuOnSelect={true}
                onChange={(e) => { handleStateChange(e, props.cell)}}
              />
            </Col>{ change ? 
            <Col xs={1}>
              <Button variant="success" disabled={processing} onClick={() => { console.log(groups); handleUpdateGroups()}}> <PlusIcon /> </Button>
            </Col> : <> </>
            }
          </Form.Row>
        </Form>
}

export default GroupSelect
