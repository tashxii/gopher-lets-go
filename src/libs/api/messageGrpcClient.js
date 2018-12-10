const gRpcMessages = {
  0: { status: "OK", message: "エラーはありません。" },
  1: { status: "Canceled", message: "処理がキャンセルされました。" },
  2: { status: "Unknown", message: "予期せぬエラーが発生しました。" },
  3: { status: "InvalidArgument", message: "入力された値に誤りがあります。" },
  4: { status: "DeadlineExceeded", message: "タイムアウトしました。" },
  5: { status: "NotFound", message: "データが見つかりません。" },
  6: { status: "AlreadyExists", message: "既にデータが存在します。" },
  7: { status: "PermissionDenied", message: "権限がありません。" },
  8: { status: "ResourceExhausted", message: "リソースが不足しています。" },
  9: { status: "FailedPrecondition", message: "実行条件が満たされていません。" },
  10: { status: "Aborted", message: "中断されました。" },
  11: { status: "OutOfRange", message: "有効な範囲ではありません。" },
  12: { status: "Unimplemented", message: "サポートされていません。" },
  13: { status: "Internal", message: "サーバでエラーが発生しました。" },
  14: { status: "Unavailable", message: "サービスは利用可能ではありません。" },
  15: { status: "DataLoss", message: "データが破損しています。" },
  16: { status: "Unauthenticated", message: "承認されていません。" }
}

let grpc
let grpc_promise
let protoLoader
let isInit = false
let client 
let rawClient

class MessageGrpcClient {
  static setRequired(grpcObj, grpcPromiseObj, protoLoaderObj) {
    grpc = grpcObj
    grpc_promise = grpcPromiseObj
    protoLoader = protoLoaderObj
  }

  static generateGrpcError = (summary, grpcRawError) => {
    let message = gRpcMessages[grpcRawError.code]
    if (message == undefined) {
      message = gRpcMessages[2]
    }
    const errorObj = {
      status: message.status,
      message: message.message,
      internalMessage: grpcRawError.message,
      internalDetail: grpcRawError.detail
    }
    console.log(errorObj)
    let errorMessage = {
      summary: summary,
      detail: `エラー：${errorObj.message}\nコード：${errorObj.status}`
    }
    return errorMessage
  }

  static loadDescriptor(protoPath) {
    const packageDefinition = protoLoader.loadSync(
      protoPath,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      })
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
    return protoDescriptor
  }

  static init = () => {
    if(isInit === false ){
      const protoDescriptor = MessageGrpcClient.loadDescriptor("message.proto")
      const message_proto = protoDescriptor.message
      const url = "localhost:10000"
      client = new message_proto.MessageService(url, grpc.credentials.createInsecure())
      grpc_promise.promisifyAll(client)
      rawClient = new message_proto.MessageService(url, grpc.credentials.createInsecure())
      isInit = true
    }
  }

  static get = () => {
    MessageGrpcClient.init()
    return client
  }

  static getRaw = () => {
    MessageGrpcClient.init()
    return rawClient
  }
}

export default MessageGrpcClient