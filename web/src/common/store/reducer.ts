import { combineReducers } from 'redux'
import { reducer as loginReducer } from '../../features/common/Login/store'

export default combineReducers({
  login: loginReducer
})
