import { combineReducers } from "redux"
import entryState from "./entryState"
import gopherState from "./gopherState"
import bulletState from "./bulletState"
import dmgState from "./dmgState"

const appState = combineReducers({
  entryState,
  gopherState,
  bulletState,
  dmgState, 
})

export default appState