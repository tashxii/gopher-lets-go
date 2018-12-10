import React, {Component} from "react"

class InputText extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          autoFocus={this.props.autoFocus}
          style={this.props.style}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

export default InputText