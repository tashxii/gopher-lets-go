import {uuidv4} from "../libs/util/generateId"
import { 
  CONNECT_START_EVENT,
  CONNECT_SUCCESS_EVENT,
} from "../actions";
const initial = {
  id: uuidv4(),
  name: "",
  nextPage: "",
}

const entryState = (state = initial, action) => {
  let newstate = Object.assign({}, state)
  switch(action.type) {
  case CONNECT_START_EVENT:
    newstate.name = action.payload.name
    newstate.nextPage = action.payload.nextPage
    return newstate
  case CONNECT_SUCCESS_EVENT:
    newstate.name = action.payload.name
    newstate.nextPage = action.payload.nextPage
    return newstate
  }
  return state
}

export default entryState