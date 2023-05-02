import { s3Upload, getAPILabs, delLabId, deleteSession, deleteS3Folder, getUserSession } from './aws'
import { setReduxSession, setIsLabRunning } from '../redux/slices/sessionSlice'
import { setLabs, setIsLoaded } from '../redux/slices/labsSlice'
import JSZip from 'jszip'

// Calls session_destroy_step_function
export const destroyLabSession = async (dispatch, LabSessionId) => {
  deleteSession(LabSessionId)
  if (dispatch !== null)
    dispatch(setReduxSession({ session: {}, isLabActive: false, isLabRunning: false, isALBRunning: false, remainingMins: 0, readme: '', currentSlide: 1 }))
}

export const refreshListOfLabs = async (dispatch, userGroups) => {
  let defaultGroup = "devopsplayground";
  await getAPILabs()
    .then((labs) => {
      // For some reason usergroups can be a string or an array apparently or undefined (...)
      // TODO: HANDLE THIS !
      if (userGroups !== undefined) {
        if (userGroups.includes("Admin") || userGroups ==="Admin") {
          dispatch(setLabs(labs.items))
        } else {
          let groups = [...userGroups];
          if (
            (groups.length === 1 && groups.includes("Developer"))
            || (groups === "Developer")
            || (groups.length === 0)) {
            groups.push(defaultGroup);
          }
          let filteredLab = labs.items.filter(function (lab) {
            let labType = lab.types.filter(type => {
              for (let idx in groups) {
                if (type.value === groups[idx]) {
                  return true
                }
              }
              return false
            })
            if (labType.length > 0) {
              return lab;
            }
            else
              return null;
          });
          dispatch(setLabs(filteredLab))
        }
      }
      dispatch(setIsLoaded(true))
    })
}

export const deleteLab = async (dispatch, uuid, labName) => {
  if (window.confirm("Are you sure you want to delete '" + labName.toString() + "' ?")) {
    await delLabId(uuid)
    await deleteS3Folder(uuid)
  }
}

export const processZip = async (folder, file) => {
  let new_zip = new JSZip()
  new_zip.loadAsync(file)
    .then(async function (zip) {
      zip.forEach(function (file) {
        let type = 'text/markdown'
        if (file.includes('.png')) type = 'image/png'
        if (file.includes('.jpg')) type = 'image/jpg'
        if (file.includes('.gif')) type = 'image/gif'
        zip.files[file].async('blob')
          .then(fileData => s3Upload(folder, new File([fileData], file), type))
      })
    })
}

// Check a step function status/execution result
export const checkLabSessionStatus = async (dispatch) => {
  for (let i = 0; i < 30; i++) {
    let userSession = await getUserSession()
    let status = userSession.status
    if (status === "CREATE_COMPLETE") {
      dispatch(setIsLabRunning(true))
      return
    } else if (status.includes("FAILED")) {
      throw new Error('Lab failed to start');
    }
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
}
