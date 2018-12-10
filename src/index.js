import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux"
import App from "./components/App"
import appState from "./reducers"
import rootSaga from "./sagas/index"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  appState,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)