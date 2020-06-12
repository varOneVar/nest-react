import * as actionTypes from './constants'

export const saveUserInfo = (data: User.userType) => ({
  type: actionTypes.LOGIN_USER_INFO_ADD,
  data,
})

export const clearUserInfo = () => ({
  type: actionTypes.LOGIN_USER_INFO_ADD,
})
