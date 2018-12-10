import React from "react"

const Img = (props) => {
  return (
    <div style={props.boxStyle}>
      <img src={props.src} style={props.style} alt={props.alt} />
    </div>
  )
}

export default Img