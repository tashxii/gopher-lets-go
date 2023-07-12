import React from "react"
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import EntryContainer from "../containers/EntryContainer"
import MainContainer from "../containers/MainContainer"
import ImageLoader from "../libs/util/imageLoader"
import MessageGrpcClient from "../libs/api/messageGrpcClient"

const electron = window.require('electron')
const remote = electron.remote
const info = remote.getGlobal('info')
ImageLoader.setImages(info.images)

const grpc = window.require("@grpc/grpc-js")
const protoLoader = window.require("@grpc/proto-loader")
const grpc_promise = window.require("grpc-promise")
MessageGrpcClient.setRequired(grpc, grpc_promise, protoLoader)

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={EntryContainer} />
      <Route path="/index.html" component={EntryContainer} />
      <Route path="/main" component={MainContainer} />
      {window.location.pathname.includes("index.html") && <Redirect to="/" />}
    </div>
  </BrowserRouter>
)
export default App