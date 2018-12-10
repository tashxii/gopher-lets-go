import {
  CONNECT_START_EVENT,
  SHOW_PLAYER_EVENT,
  DEAD_PLAYER_EVENT,
  HIT_BULLET_EVENT,
  SHOW_BULLET_EVENT,
  SEND_MESSAGE_ALL_START_EVENT,
  SEND_MESSAGE_ALL_SUCCESS_EVENT,
} from "../actions"

import Gopher from "../libs/model/gopher"

const initial = {}

const gopherState = (state = initial, action) => {
  let newstate = Object.assign({}, state)
  let gopher
  switch(action.type) {
    case CONNECT_START_EVENT:
      gopher = new Gopher(action.payload.id)
      gopher.name = action.payload.name
      gopher.x = "250"
      gopher.y = "200"
      newstate[gopher.id] = gopher
      return newstate
    case SHOW_PLAYER_EVENT:
      // id, name, life, x, y, size, charge
      gopher = newstate[action.payload.id]
      if (!gopher) { 
        gopher = new Gopher(action.payload.id)
        newstate[action.payload.id] = gopher
      }
      gopher.name = action.payload.name
      gopher.x = action.payload.x
      gopher.y = action.payload.y
      gopher.life = action.payload.life
      gopher.size = action.payload.size
      gopher.charge = action.payload.charge
      return newstate
    case HIT_BULLET_EVENT:
      //"hit %s %s %d %d %t", player.id, bullet.id, player.life, player.size, bullet.special
      gopher = newstate[action.payload.playerId]
      if (!gopher) return newstate
      gopher.life = action.payload.life
      gopher.size = action.payload.size
      return newstate
    case DEAD_PLAYER_EVENT:
      delete newstate[action.payload.id]
      return newstate
  }
  return state
}

export default gopherState