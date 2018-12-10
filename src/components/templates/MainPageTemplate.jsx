import React, {Component} from "react"
import MainView from "../parts/MainView"

class MainPageTemplate extends Component {
  render() {
    return (
      <MainView
        {...this.props}
      >
      </MainView>
    )
  }
}

export default MainPageTemplate