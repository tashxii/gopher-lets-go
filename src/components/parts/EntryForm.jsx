import React, {Component} from "react"
import TextLabel from "../basics/TextLabel"
import InputText from "../basics/InputText"
import Button from "../basics/Button"

class EntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {name: ""}
    this.handleChange = this.handleChange.bind(this)
    this.onEntryButtonClick = this.onEntryButtonClick.bind(this)
  }

  render() {
    return (
      <div>
        <div>
          <TextLabel text="Enter your name:"/>
          <InputText style={{height:"30px", width:"120px"}} autoFocus={"true"} onChange={this.handleChange}/>
        </div>
        <Button label="Entry" onClick={this.onEntryButtonClick} disabled={!this.state.name}/>
      </div>
    )
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }

  onEntryButtonClick() {
    this.props.onEntryButtonClick(this.props.entryState.id, this.state.name, "")
  }

}

export default EntryForm


