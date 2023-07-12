import { fork, take, call, put } from "redux-saga/effects"
import { eventChannel } from "redux-saga"
import MessageApi from "../libs/api/messageApi"
import Gopher from "../libs/model/gopher"
import {
  CONNECT_START_EVENT,
  CONNECT_SUCCESS_EVENT,
  connectSuccessEvent,
  connectFailureEvent,
  DISCONNECT_START_EVENT,
  disconnectSuccessEvent,
  disconnectFailureEvent,
  SEND_MESSAGE_OTHERS_START_EVENT,
  sendMessageOthersSuccessEvent,
  sendMessageOthersFailureEvent,
  SEND_MESSAGE_ALL_START_EVENT,
  sendMessageAllSuccessEvent,
  sendMessageAllFailureEvent,
  showPlayerEvent,
  showBulletEvent,
  missBulletEvent,
  hitBulletEvent,
  deadPlayerEvent,
  REFRESH_START_EVENT,
  sendMessageAllStartEvent,
  sendMessageOthersStartEvent,
  SHOW_PLAYER_EVENT,
  FIRE_BOMB_EVENT,
  FIRE_MISSILE_EVENT,
} from "../actions"

function* handleConnect() {
  while (true) {
    const action = yield take(CONNECT_START_EVENT)
    console.log("handleConnect: action=" + JSON.stringify(action))
    const { error } = yield call(
      MessageApi.connectAsync,
      action.payload.id,
      action.payload.name,
    )
    if (error) {
      console.error(error)
      yield put(connectFailureEvent())
    } else {
      yield put(connectSuccessEvent(action.payload.id, action.payload.name, "/main"))
    }
  }
}

function* handleDisconnect() {
  while (true) {
    const action = yield take(DISCONNECT_START_EVENT)
    console.log("handleDisconnect: action=" + JSON.stringify(action))
    const { error } = yield call(
      MessageApi.disconnectAsync,
      action.payload.id,
    )
    if (error) {
      console.error(error)
      yield put(disconnectFailureEvent())
    } else {
      yield put(disconnectSuccessEvent())
    }
  }
}

function* handleSendMessageOthers() {
  while (true) {
    const action = yield take(SEND_MESSAGE_OTHERS_START_EVENT)
    console.log("handleSendMessageOthers: action=" + JSON.stringify(action))
    const { error } = yield call(
      MessageApi.sendMessageOthersAsync,
      action.payload.id,
      action.payload.type,
      action.payload.params,
    )
    if (error) {
      console.error(error)
      yield put(sendMessageOthersFailureEvent())
    } else {
      yield put(sendMessageOthersSuccessEvent())
    }
  }
}

function* handleSendMessageAll() {
  while (true) {
    const action = yield take(SEND_MESSAGE_ALL_START_EVENT)
    console.log("handleSendMessageAll: action=" + JSON.stringify(action))
    const { error } = yield call(
      MessageApi.sendMessageAllAsync,
      action.payload.id,
      action.payload.type,
      action.payload.params,
    )
    if (error) {
      console.error(error)
      yield put(sendMessageAllFailureEvent())
    } else {
      yield put(sendMessageAllSuccessEvent())
    }
  }
}

function createReceiveMessageEventChannel(prms) {
  return eventChannel(emit => {
    prms.on("data", function (res) {
      console.log("createReceiveMessageEventChannel: " + JSON.stringify(res))
      switch (res.type) {
        case "show":
          //"show %s %s %d %d %d %d %s", id, name, life, x, y, size, charge
          emit(showPlayerEvent(...res.params))
          break
        case "bullet":
          //"bullet %s %d %d %d %d %t", id, x, y, direction, size, special
          console.log("bullet")
          emit(showBulletEvent(...res.params))
          break
        case "miss":
          //"miss %s %t", id, special
          emit(missBulletEvent(...res.params))
          break
        case "hit":
          //"hit %s %s %d %d %t", player.id, bullet.id, player.life, player.size, bullet.special
          emit(hitBulletEvent(...res.params))
          break
        case "dead":
          //"dead %s %s %t", player.id, bullet.id, bullet.special
          emit(deadPlayerEvent(...res.params))
          break
        default:
          console.log("no matching message type " + res.type)
      }
    })
    const unsubscribe = () => {
      prms.on("end", function () { console.log("disconnected.") })
    }
    return unsubscribe
  })
}

function* watchReceiveMessage() {
  const action = yield take(CONNECT_SUCCESS_EVENT)
  const prms = yield call(MessageApi.receiveMessage, action.payload.id)
  const channel = createReceiveMessageEventChannel(prms)
  while (true) {
    console.log("watchConnectSuccess: action=" + JSON.stringify(action))
    const payload = yield take(channel)
    console.log("take channel...")
    console.log(payload)
    yield put(payload)
  }
}

function* watchRefresh() {
  const action = yield take(REFRESH_START_EVENT)
  const channel = yield call(createRefreshChannel, action.payload.id)
  while (true) {
    const payload = yield take(channel)
    yield put(payload)
  }
}

function createRefreshChannel(id) {
  return eventChannel(emit => {
    const iv = setInterval(() => {
      emit(sendMessageAllStartEvent(id, "refresh", []))
    }, 1)
    return () => {
      clearInterval(iv)
    }
  })
}

function* handleMousemove() {
  while (true) {
    const action = yield take(SHOW_PLAYER_EVENT)
    const { id, x, y, charge } = action.payload
    yield put(sendMessageOthersStartEvent(id, "show", [x, y, charge]))
  }
}

function* handleFireBomb() {
  while (true) {
    const action = yield take(FIRE_BOMB_EVENT)
    const { id, x, y, direction } = action.payload
    console.log("fire bomb ... ")
    console.log(action)
    yield put(sendMessageOthersStartEvent(id, "fire-bomb", [x, y, direction]))
  }
}

function* handleFireMissile() {
  while (true) {
    const action = yield take(FIRE_MISSILE_EVENT)
    const { id, x, y, direction } = action.payload
    console.log("fire bomb ... ")
    console.log(action)
    yield put(sendMessageOthersStartEvent(id, "fire-missile", [x, y, direction]))
  }
}

export default function* rootSaga() {
  yield fork(handleConnect)
  yield fork(handleDisconnect)
  yield fork(watchReceiveMessage)
  yield fork(handleSendMessageOthers)
  yield fork(handleSendMessageAll)
  yield fork(watchRefresh)
  yield fork(handleMousemove)
  yield fork(handleFireBomb)
  yield fork(handleFireMissile)
}
