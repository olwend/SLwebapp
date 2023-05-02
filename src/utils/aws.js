import { Storage, API } from 'aws-amplify'

export const s3UploadText = async (folder, file, text) => {
  const filename = `${folder}/${file.toLowerCase()}`
  const stored = await Storage.put(filename, text)
  
  return stored.key
}

export const s3Upload = async (folder, file, type) => {
  const filename = `${folder}/${file.name.toLowerCase()}`
  const stored = await Storage.put(filename, file, { contentType: type, ACL: "public-read" })
  
  return stored.key
}

export const s3Download = async folder => await Storage.get(`${folder}/readme.md`, { download: true, cacheControl: 'no-cache' })

export const getUserSession = async (userId) => {
  let sessions = await API.get("dpg-v2", "/v1/self/sessions")
  // Convert iso 8601 timestamp to unixtime milliseconds
  // Move this to server side or stick to key 0
  sessions.forEach(function (session, index) {
    let startDateTime = new Date(session['startDateTime'])
    session['startDateTime'] = startDateTime.getTime()
    sessions[index] = session
  })

  return sessions[0]
}

export const getLabStatus = function(labUuid) {
  let UserSession = getUserSession()
  return UserSession
}

export const getUsers = () => API.get("dpg", "/api/v2/users")

export const deleteSession = sessionUuid => API.del("dpg-v2", `/v1/self/sessions/${sessionUuid}`)

export const getGroups = async () => {
  let groups = await API.get("dpg-v2", "/v1/groups")
  return groups.groups
}

export const createGroup = async json => {
  return await API.post("dpg-v2", "/v1/groups", {
    body: {
      groupName: json.groupName,
      description: json.groupDescription
    }
  })
}

export const deleteGroup = json => API.del("dpg-v2", `/v1/groups/${json.groupName}`)

export const deleteS3Folder = async (folder) => (await Storage.list(folder)).forEach(element => Storage.remove(element.key))

export const getAPILabs = () => API.get("dpg-v2", "/v1/labs")

export const delLabId = async id => await API.del("dpg-v2", `/v1/labs/${id}`, {})

export const getLabId = async id => await API.get("dpg-v2", `/v1/labs/${id}`)

export const addLab = async (json)  => { 
  delete json.uuid; 
  delete json.file;
  return await API.post("dpg-v2", '/v1/labs', { body: json }) 
}

export const updateLab = async (labDefinition) => {
  let labUuid = labDefinition.uuid;
  // The api will populate this now
  delete labDefinition.uuid;
  delete labDefinition.createdDateTime;
  return await API.put("dpg-v2", `/v1/labs/${labUuid}`, { body: labDefinition })
}

export const getAchievementsId = async id => API.get("dpg-v2", `/v1/achievements/${id}`)

export const createSession = json => {
  return API.post("dpg-v2", "/v1/self/sessions", {
    body: {
      labUuid: json.labId,
    }
  })
}

export const updateUserSettings = async json => {
  let header = {
    "Access-Control-Allow-Origin": '*'
  }
  return await API.put("dpg", `/api/v2/users/${json.userId}`, {
    header: header,
    body: json
  })
}
