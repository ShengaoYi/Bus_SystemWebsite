import { createStore } from 'redux'
import updateDataReducer from './reducers/update_data'

//暴露store
export default createStore(updateDataReducer)

