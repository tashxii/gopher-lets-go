import React, { Component } from "react"
import EntryPageTemplate from "../templates/EntryPageTemplate"

class EntryPage extends Component {
  componentDidUpdate() {
    if (this.props.entryState.nextPage !== undefined && this.props.entryState.nextPage !== "") {
      this.props.history.push(this.props.entryState.nextPage)
    }
  }


  render() {
    return <EntryPageTemplate
      {...this.props}
    />
  }

  onEntryButtonClick = () => {
    console.log(this.props.history)
    this.props.history.push("/main")
  }

}

export default EntryPage