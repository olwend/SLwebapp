import React, {useState, useEffect} from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import Select from "react-select";
// import { updateUserSettings } from '../utils/aws'
import { PlusIcon  } from "@primer/octicons-react";
import { refreshListOfLabs } from '../utils/lab'
import { updateLab } from "../utils/aws";

const LabsSelect = props => {

  const [ labsInGroup, setLabsInGroup ] = useState([]);
  const [ labs, setLabs ] = useState([]);
  const [ savedLabs, setSavedLabs ] = useState([])
  const [ change, setChange ] = useState(false);
  const [ processing, setProcessing ] = useState(false); 
  const [ addLabsToGroup,setAddLabsToGroup ] = useState([]);
  const [ removeLabsFromGroup, setRemoveLabsFromGroup ] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      // console.log("RELOAD");
      if(props.row.groupName !== "Admin" || props.row.groupName !== "Developer"){
        let values = []
        let allLabs = []
        props.labs.filter(function (lab) {
          // console.log(lab);
          allLabs.push({value:lab.uuid, label: lab.labName, data: lab})
          return lab.types.filter(function(group){
            if(group.value === props.row.groupName){
              // console.log("CMP:", group.value , props.row.groupName)
              // console.log("LABS:", lab)
              values.push({value:lab.uuid, label: lab.labName, data: lab})
              return true;
            }
            else {
              return false
            }
          })
        })
        // console.log("VALUES:",values )
        setLabs(allLabs);
        setLabsInGroup(values);
        setSavedLabs(values);
      }
    }
    onLoad()
  },[props])

  const handleStateChange = (labsSelected) => {
    console.log("E",labsSelected)

    if(labsSelected === null)
      labsSelected = []
    setLabsInGroup(labsSelected)
    let addLabsTmp = labsSelected.filter(value => !savedLabs.includes(value))
    let removeLabsTmp = savedLabs.filter(value => !labsSelected.includes(value))
    //remove dupicit of same lab in add and remove incase user remove it and add it without saving we dont need to do this operation
    let addLabs = addLabsTmp.filter(({ value: id1 }) => !removeLabsTmp.some(({ value: id2 }) => id2 === id1));
    let removeLabs = removeLabsTmp.filter(({ value: id1 }) => !addLabsTmp.some(({ value: id2 }) => id2 === id1));
    if(addLabs.length === 0 && removeLabs.length === 0){
      setChange(false)
    } else {
      setChange(true)
    }
    setAddLabsToGroup(addLabs)
    setRemoveLabsFromGroup(removeLabs)
  }


  const handleUpdateLabs = async () => {
    setProcessing(true);
    let group = {value: props.row.groupName, label: props.row.groupName}
    try {
      for(let idx in removeLabsFromGroup){
        let newGroups = []  
        removeLabsFromGroup[idx].data.types.map(value => {
          if(value.value !== props.row.groupName)
            newGroups.push(value)
          return true
        })
        let updatedLabValues = setLabValue(removeLabsFromGroup[idx].data, newGroups)
        await updateLab(updatedLabValues);
      }
      for(let idx in addLabsToGroup){
        let newGroups = []  
        addLabsToGroup[idx].data.types.map(value => newGroups.push(value))
        newGroups.push(group)
        let updatedLabValues = setLabValue(addLabsToGroup[idx].data, newGroups)
        await updateLab(updatedLabValues);
      }
      setChange(false);
    } catch (error) {
      console.error(error);
    }
    refreshListOfLabs(props.dispatch, ["Admin"])
    setProcessing(false);
  }

  const setLabValue = (lab, groups) => {
    let values = {
      'labName': lab.labName,
      'description': lab.description,
      'types': groups,
      'timer': lab.timer,
      'containerDefinition': lab.containerDefinition,
      'active': lab.active,
      'ide': lab.ide,
      'shell': lab.shell,
      'basePorts': lab.basePorts,
      'resourcesCPUMEM': lab.resourcesCPUMEM,
      'categories': lab.categories,
      'baseGitUrl': lab.baseGitUrl,
      'uuid': lab.uuid,
      'userUuid': lab.userUuid,
      'achievements': lab.achievements,
      'achievementsImage' : lab.achievementsImage,
      'achievementsDebug' : lab.achievementsDebug,
      'integratedWebsite' : lab.integratedWebsite,
      'integratedWebsiteURL' : lab.integratedWebsiteURL
    }
    return values;
  }

  return (props.row.groupName === "Admin" || props.row.groupName === "Developer") ? 
      null :
      <Form>
          <Form.Row className="align-items-center">
            <Col xs={11}>
              <Select
                isMulti
                value={labsInGroup}
                options={labs}
                closeMenuOnSelect={true}
                onChange={(e) => { handleStateChange(e, props.cell)}}
              />
            </Col>{ change ? 
            <Col xs={1}>
              <Button variant="success" size="sm" disabled={processing} onClick={() => {handleUpdateLabs()}}> <PlusIcon /> </Button>
            </Col> : <> </>
            }
          </Form.Row>
        </Form>
}

export default LabsSelect
