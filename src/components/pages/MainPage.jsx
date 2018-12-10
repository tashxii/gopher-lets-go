import React, {Component} from "react"
import MainPageTemplate from "../templates/MainPageTemplate"

class MainPage extends Component {
  componentDidMount() {
    this.props.onRefresh(this.props.entryState.id)
  }

  render() {
    return <MainPageTemplate 
      {...this.props}
    />
  }
}

export default MainPage