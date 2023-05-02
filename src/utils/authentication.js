import { setUser } from '../redux/slices/userSlice'
import { Auth } from 'aws-amplify'
import { setLabs } from '../redux/slices/labsSlice'
import { setReduxSession } from '../redux/slices/sessionSlice'

import userDataObject from './data/user'

export const setUserData = (dispatch, user) => {
  let groups = user.signInUserSession.accessToken.payload["cognito:groups"] || []
  let userAdminGroup = groups.includes("Admin")
  dispatch(setUser(userDataObject(user, groups, userAdminGroup)))
}

export const changingPassword = async (history, fields) => {
  const currentUser = await Auth.currentAuthenticatedUser()
  await Auth.changePassword(currentUser, fields.oldPassword, fields.password)
  history.push("/")
}

export const logout = dispatch => async () => {
  await Auth.signOut()
  dispatch(setUser({ isAuthenticated: false }))
  dispatch(setReduxSession({ session: {}, isLabActive: false }))
  dispatch(setLabs([]))
}
