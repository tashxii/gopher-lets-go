import { isRoot } from "postcss-selector-parser";

export const CONNECT_START_EVENT = "CONNECT_START_EVENT"
export const CONNECT_SUCCESS_EVENT = "CONNECT_SUCCESS_EVENT"
export const CONNECT_FAILURE_EVENT = "CONNECT_FAILURE_EVENT"
export const DISCONNECT_START_EVENT = "DISCONNECT_START_EVENT"
export const DISCONNECT_SUCCESS_EVENT = "DISCONNECT_SUCCESS_EVENT"
export const DISCONNECT_FAILURE_EVENT = "DISCONNECT_FAILURE_EVENT"
export const SEND_MESSAGE_OTHERS_START_EVENT = "SEND_MESSAGE_OTHERS_START_EVENT"
export const SEND_MESSAGE_OTHERS_SUCCESS_EVENT = "SEND_MESSAGE_OTHERS_SUCCESS_EVENT"
export const SEND_MESSAGE_OTHERS_FAILURE_EVENT = "SEND_MESSAGE_OTHERS_FAILURE_EVENT"
export const SEND_MESSAGE_ALL_START_EVENT = "SEND_MESSAGE_ALL_START_EVENT"
export const SEND_MESSAGE_ALL_SUCCESS_EVENT = "SEND_MESSAGE_ALL_SUCCESS_EVENT"
export const SEND_MESSAGE_ALL_FAILURE_EVENT = "SEND_MESSAGE_ALL_FAILURE_EVENT"
export const SHOW_PLAYER_EVENT = "SHOW_PLAYER_EVENT"
export const DEAD_PLAYER_EVENT = "DEAD_PLAYER_EVENT"
export const SHOW_BULLET_EVENT = "SHOW_BULLET_EVENT"
export const MISS_BULLET_EVENT = "MISS_BULLET_EVENT"
export const HIT_BULLET_EVENT = "HIT_BULLET_EVENT"
export const FIRE_BOMB_EVENT = "FIRE_BOMB_EVENT"
export const FIRE_MISSILE_EVENT = "FIRE_MISSILE_EVENT"
export const REFRESH_START_EVENT = "REFRESH_START_EVENT"
export const MOUSEUP_START_EVENT = "MOUSEUP_START_EVENT"
export const MOUSEDOWN_START_EVENT = "MOUSEDOWN_START_EVENT"


export const connectStartEvent = (id, name, nextPage) => ({
  type: CONNECT_START_EVENT,
  payload: {
    id: id,
    name: name,
    nextPage: nextPage,
  },
})

export const connectSuccessEvent = (id, name, nextPage) => ({
  type: CONNECT_SUCCESS_EVENT,
  payload: {
    id: id,
    name: name,
    nextPage: nextPage,
  },
})

export const connectFailureEvent = (error) => ({
  type: CONNECT_FAILURE_EVENT,
  payload: {
    error: error,
  },
})

export const disconnectStartEvent = (name, nextPage) => ({
  type: DISCONNECT_START_EVENT,
  payload: {
    name: name,
    nextPage: nextPage,
  },
})

export const disconnectSuccessEvent = (name, nextPage) => ({
  type: DISCONNECT_SUCCESS_EVENT,
  payload: {
    name: name,
    nextPage: nextPage,
  },
})

export const disconnectFailureEvent = (error) => ({
  type: DISCONNECT_FAILURE_EVENT,
  payload: {
    error: error,
  },
})

export const sendMessageOthersStartEvent = (id, type, params) => (
  {
  type: SEND_MESSAGE_OTHERS_START_EVENT,
  payload: {
    id: id,
    type: type,
    params: params,
  },
})

export const sendMessageOthersSuccessEvent = () => ({
  type: SEND_MESSAGE_OTHERS_SUCCESS_EVENT,
  payload: {
  },
})

export const sendMessageOthersFailureEvent = (error) => ({
  type: SEND_MESSAGE_OTHERS_FAILURE_EVENT,
  payload: {
    error: error,
  },
})

export const sendMessageAllStartEvent = (id, type, params) => ({
  type: SEND_MESSAGE_ALL_START_EVENT,
  payload: {
    id: id,
    type: type,
    params: params,
  },
})

export const sendMessageAllSuccessEvent = () => ({
  type: SEND_MESSAGE_ALL_SUCCESS_EVENT,
  payload: {
  },
})

export const sendMessageAllFailureEvent = (error) => ({
  type: SEND_MESSAGE_ALL_FAILURE_EVENT,
  payload: {
    error: error,
  },
})

//"show %s %s %d %d %d %d %s", id, name, life, x, y, size, charge
export const showPlayerEvent = (id, name, life, x, y, size, charge) => ({
  type: SHOW_PLAYER_EVENT,
  payload: {
    id: id, name: name, life: life, x: x, y: y, size: size, charge: charge,
  },
})

//"bullet %s %d %d %d %d %t", id, x, y, direction, size, special
export const showBulletEvent = (id, x, y, direction, special) => ({
  type: SHOW_BULLET_EVENT,
  payload: {
    id: id, x: x, y: y, direction: direction, special: special,
  },
})

//"miss %s %t", id, special
export const missBulletEvent = (id, special) => ({
  type: MISS_BULLET_EVENT,
  payload: {
    id: id, special: special,
  },
})

//"hit %s %s %d %d %t", player.id, bullet.id, player.life, player.size, bullet.special
export const hitBulletEvent = (playerId, bulletId, life, size, special) => ({
  type: HIT_BULLET_EVENT,
  payload: {
    playerId: playerId, bulletId: bulletId, life: life, size: size, special: special,
  },
})

//"dead %s %s %t", player.id, bullet.id, bullet.special
export const deadPlayerEvent = (playerId, bulletId, special) => ({
  type: DEAD_PLAYER_EVENT,
  payload: {
    playerId: playerId, bulletId: bulletId, special: special,
  },
})

//["fire-bom", e.pageX, e.pageY, direction]
export const fireBombEvent = (id, x, y, direction) => ({
  type: FIRE_BOMB_EVENT,
  payload: {
    id: id,
    x: x,
    y: y,
    direction: direction
  }
})

//["fire-missile", e.pageX, e.pageY, direction]
export const fireMissileEvent = (id, x, y, direction) => ({
  type: FIRE_MISSILE_EVENT,
  payload: {
    id: id,
    x: x,
    y: y,
    direction: direction
  }
})

export const refreshStartEvent = (id) => ({
  type: REFRESH_START_EVENT,
  payload: {
    id: id,
  },
})
