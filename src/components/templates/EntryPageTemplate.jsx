import React, {Component} from "react"
import styled from 'styled-components'
import EntryForm from "../parts/EntryForm"

class EntryPageTemplate extends Component {
  render() {
    return (
      <Div parent>
        <Div center>
          <EntryForm {...this.props}/>
        </Div>
      </Div>
    )
  }
}

const Div = styled.div`
  ${props => (props.parent ? parent : (props.center ? center : ""))}"
`
const parent = {height: "90vh", width: "90vw", position: "relative"}
const center = {textAlign:"center",top: "50%",left: "50%", transform : "translate(-50%,-50%)",position: "absolute"}



export default EntryPageTemplate