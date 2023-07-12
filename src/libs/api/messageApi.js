
import MessageGrpcClient from "./messageGrpcClient"

class MessageApi {
  static connectAsync = async (id, name) => {
    const client = MessageGrpcClient.getRaw()
    const prom = new Promise((resolve, reject) => {
      client.Connect({
        id: id,
        name: name,
        x: 250,
        y: 200,
      }, (err, response) => {
        console.warn("here", err, response)
        err === null ? resolve(response) : reject(err);
      })
    })
    return await prom
  }

  static disconnectAsync = async (id) => {
    const client = MessageGrpcClient.getRaw()
    const prom = new Promise((resolve, reject) => {
      client.Disconnect({ id }, (err, response) => {
        err === null ? resolve(response) : reject(err);
      })
    })
      .then(() => ({}))
      .catch(error => ({ error }))
    return await prom
  }

  static receiveMessage = (id) => {
    const client = MessageGrpcClient.getRaw()
    const req = { from_id: id }
    const call = client.ReceiveMessage(req)
    return call
  }

  static sendMessageOthersAsync = async (id, type, params) => {
    const client = MessageGrpcClient.getRaw()
    const prom = new Promise((resolve, reject) => {
      client.SendMessageOthers({
        from_id: id,
        type: type,
        params: params,
      }, (err, response) => {
        err === null ? resolve(response) : reject(err);
      })
    })
      .then(() => ({}))
      .catch(error => ({ error }))
    return await prom
  }

  static sendMessageAllAsync = async (id, type, params) => {
    const client = MessageGrpcClient.getRaw()
    const prom = new Promise((resolve, reject) => {
      client.SendMessageAll({
        from_id: id,
        type: type,
        params: params,
      }, (err, response) => {
        err === null ? resolve(response) : reject(err);
      })
    })
      .then(() => ({}))
      .catch(error => ({ error }))
    return await prom
  }
}

export default MessageApi