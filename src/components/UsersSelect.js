import React, {useState, useEffect} from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import Select from "react-select";
import { getUsers, updateUserSettings } from '../utils/aws'
import { PlusIcon  } from "@primer/octicons-react";

const UsersSelect = props => {
  console.log("props" , props)
  const [ users, setUsers ] = useState([]);
  const [ selectedUsers, setSelectedUsers ] = useState([])
  const [ change, setChange ] = useState(false);
  const [ processing, setProcessing ] = useState(false); 
  const [ addUsersToGroup,setAddUsersToGroup ] = useState([]);
  const [ removeUsersFromGroup,setRemoveUsersFromGroup ] = useState([]);
  const [ savedUsers, setSavedUsers ] = useState([])

  useEffect(() => {
    const onLoad = async () => {
      let values = []
      let selected = []
      for (let user in props.users){
        let name = props.users[user].Attributes.filter(item => item.Name === "name")
        let email = props.users[user].Attributes.filter(item => item.Name === "email")
        let groupName = props.users[user].group.map(value => value.GroupName);
        let nameEmail = ( name.length > 0 ? name[0].Value + " / " : "" ) + email[0].Value
        let group = props.users[user].group.filter(item => item.GroupName === props.row.groupName)
        if(group.length > 0){
          selected.push({value:props.users[user].Username, label: nameEmail, groups: groupName})
        }
        values.push({value:props.users[user].Username, label: nameEmail, groups:groupName})
      }
      setSelectedUsers(selected);
      setUsers(values);
      setSavedUsers(selected)
    }
    onLoad()
  },[props])

  const handleUpdateLabs = async () => {
    setProcessing(true)
    let group = props.row.groupName
    try {
      for(let idx in removeUsersFromGroup){
        let newGroups = []
        removeUsersFromGroup[idx].groups.map(value => {
          if (value !== group)
            newGroups.push(value)
          return true
        })
        await groupUpdate("updateUserGroups",removeUsersFromGroup[idx].value, newGroups);
      }

      for(let idx in addUsersToGroup){
        let newGroups = []
        addUsersToGroup[idx].groups.map(value => newGroups.push(value))
        newGroups.push(group);
        await groupUpdate("updateUserGroups",addUsersToGroup[idx].value, newGroups);
      }
      setChange(false);
      getUsers().then((users) => props.setUsers(users))
    } catch (error) {
      console.error(error);
    }

    setProcessing(false)

  }

  const groupUpdate = async (action, userId, grp) => {
    let body = {
      action: action,
      userId: userId,
      groups: grp
    }
    await updateUserSettings(body);
  }

  const handleStateChange = (actualItems) => {

    if(actualItems === null)
      actualItems = []
    setSelectedUsers(actualItems);
    let addUsersTmp = actualItems.filter(value => !savedUsers.includes(value))
    let removeUsersTmp = savedUsers.filter(value => !actualItems.includes(value))
    //Remove users which was removed and added without saving
    let addUsers = addUsersTmp.filter(({ value: id1 }) => !removeUsersTmp.some(({ value: id2 }) => id2 === id1));
    let removeUsers = removeUsersTmp.filter(({ value: id1 }) => !addUsersTmp.some(({ value: id2 }) => id2 === id1));

    if(addUsers.length === 0 && removeUsers.length === 0){
      setChange(false)
    } else {
      setChange(true)
    }

    setAddUsersToGroup(addUsers);
    setRemoveUsersFromGroup(removeUsers)

  }

  return <Form>
          <Form.Row className="align-items-center">
            <Col xs={11}>
              <Select
                isMulti
                value={selectedUsers}
                options={users}
                closeMenuOnSelect={true}
                onChange={(e) => { handleStateChange(e)}}
              />
              </Col>{ change ? 
            <Col xs={1}>
              <Button variant="success" size="sm" disabled={processing} onClick={() => {handleUpdateLabs()}}> <PlusIcon /> </Button>
            </Col> : <> </>
            }
          </Form.Row>
        </Form>
}

export default UsersSelect
