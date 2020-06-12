import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const finalCreatetore = compose(
  applyMiddleware(thunk),
)
export default createStore(reducer, finalCreatetore)
