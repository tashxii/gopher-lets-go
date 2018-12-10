import React from "react"
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #67c5ff;
  background: #f2fcff;
  border: solid 2px #67c5ff;
  border-radius: 3px;
  transition: .4s;
  &:hover {
    background: lightgreen;
    color: white;
  }
  &:disabled {
    background: lightgray
    color: white;
  }
`

const Button = (props) => {
  return (
    <StyledButton type="button" onClick={props.onClick} disabled={props.disabled}>
      {props.label}
    </StyledButton>
  )
}

export default Button
