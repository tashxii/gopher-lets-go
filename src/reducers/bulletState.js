import { FIRE_BOMB_EVENT, FIRE_MISSILE_EVENT, SHOW_BULLET_EVENT, MISS_BULLET_EVENT, HIT_BULLET_EVENT, DEAD_PLAYER_EVENT, SHOW_PLAYER_EVENT, SEND_MESSAGE_ALL_START_EVENT, SEND_MESSAGE_ALL_SUCCESS_EVENT } from "../actions";
import Bullet from "../libs/model/bullet";

const initial = {
  bombs: {},
  missiles: {},
}

const bulletState = (state = initial, action) => {
  let newstate = Object.assign({}, state)
  let bullets
  switch(action.type) {
    case FIRE_BOMB_EVENT:
      console.log(action)
      const bomb = new Bullet(action.payload.id, action.payload.x, action.payload.y, "false")
      newstate.bombs[bomb.id] = bomb
      console.log(bomb)
      return newstate
    case FIRE_MISSILE_EVENT:
      // if (state.missiles[action.payload.id] !== undefined) {
      //   return newstate//キャンセルはできない
      // }
      console.log(action)
      const missile = new Bullet(action.payload.id, action.payload.x, action.payload.y, "true")
      console.log(bomb)
      newstate.missiles[missile.id] = missile
      return newstate
    case SHOW_BULLET_EVENT:
      //id, x, y, direction, special
      console.log(action)
      bullets = (action.payload.special === "true") ? newstate.missiles : newstate.bombs
      let bullet = bullets[action.payload.id]
      if (!bullet) { 
        bullet = new Bullet(action.payload.id, action.payload.x, action.payload.y, action.payload.special)
        bullets[action.payload.id] = bullet
      } else {
        bullet.x = action.payload.x
        bullet.y = action.payload.y
      }
      console.log(bullet)
      return newstate
    case MISS_BULLET_EVENT:
      //"miss %s %t", id, special
      bullets = (action.payload.special === "true") ? newstate.missiles : newstate.bombs
      delete bullets[action.payload.id]
      return newstate
    case HIT_BULLET_EVENT:
      //"hit %s %s %d %d %t", player.id, bullet.id, player.life, player.size, bullet.special
      bullets = (action.payload.special === "true") ? newstate.missiles : newstate.bombs
      delete bullets[action.payload.bulletId]
      return newstate
    case DEAD_PLAYER_EVENT:
      delete newstate.bombs[action.payload.id]
      delete newstate.missiles[action.payload.id]
      return newstate
  }
  return state
}

export default bulletState