import * as actionTypes from './constants'

interface ActionUser{
  type: string;
  data: User.userType
}

const defaultState: User.userType = {
  logger: false,
  username: '',
  pwd: ''
}

function reducer(state: User.userType = defaultState, action: ActionUser) {
  switch (action.type) {
    case actionTypes.LOGIN_USER_INFO_ADD: {
      return Object.assign(state, action.data, { logger: true })
    }
    case actionTypes.LOGIN_USER_INFO_CLEAR:
      return ({
        logger: false,
        username: '',
        pwd: ''
      })
    default:
      return state
  }
}
export default reducer