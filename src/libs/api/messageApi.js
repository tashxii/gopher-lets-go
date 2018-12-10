
import MessageGrpcClient from "./messageGrpcClient"

class MessageApi {
  static connectAsync = async (id, name) => {
    const client = MessageGrpcClient.get()
    return client.Connect().sendMessage({
      id: id,
      name: name,
      x: 250,
      y: 200,
    })
    .then(() => ({}))
    .catch(error => ({ error }))
  }

  static disconnectAsync = async (id) => {
    const client = MessageGrpcClient.get()
    return client.Disconnect().sendMessage({
      "id": id
    })
    .then(() => ({}))
    .catch(error => ({ error }))    
  }

  static receiveMessage = (id) => {
    const client = MessageGrpcClient.getRaw()
    const req = { from_id: id }
    const call = client.ReceiveMessage(req)
    return call
  }

  static sendMessageOthersAsync = async (id, type, params) => {
    const client = MessageGrpcClient.get()
    return client.SendMessageOthers().sendMessage({
      from_id: id,
      type: type,
      params: params,
    })
    .then(() => ({}))
    .catch(error => ({ error }))
  }

  static sendMessageAllAsync = async (id, type, params) => {
    const client = MessageGrpcClient.get()
    return client.SendMessageAll().sendMessage({
      from_id: id,
      type: type,
      params: params,
    })
    .then(() => ({}))
    .catch(error => ({ error }))
  }
}

export default MessageApi