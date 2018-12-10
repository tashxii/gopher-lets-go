import React, { Component } from "react"
import Img from "./Img"
import ImageLoader from "../../libs/util/imageLoader"
import TextLabel from "./TextLabel"
import Gopher from "../../libs/model/gopher"

const nameStyle = {
  position: "absolute",
  bottom: "-20px",
  left: "30px"
}

class GopherImg extends Component {
  render() {
    const gopher = this.props.gopher
    const top = (parseInt(gopher.y) - parseInt(gopher.size)/2) + "px"
    const left = (parseInt(gopher.x) - parseInt(gopher.size)/2) + "px"
    const texttop = (parseInt(gopher.y) + parseInt(gopher.size)/2) + "px"
    const textleft = (parseInt(gopher.x)) + "px"
    let border = "none"
    if (gopher.charge === Gopher.CHARGE_CHARGING) border = "5px dotted yellow"
    else if (gopher.charge === Gopher.CHARGE_CHARGED) border = "5px double red"
    const size = gopher.size + "px"
    return (
      <div>
        <Img src={ImageLoader.loadSrc("gopher.png")} 
          style={{position: "absolute", top: top, left: left, border: border, height: size, width: size}}
          alt={"gopher"}>
        </Img>
        <TextLabel style={{position: "absolute", top: texttop, left: textleft, textAlign: "center", color: "blueviolet"}} text={gopher.name}/>
      </div>
    )
  }
}

export default GopherImg