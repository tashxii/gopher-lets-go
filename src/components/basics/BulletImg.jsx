import React, { Component } from "react"
import Img from "./Img"
import ImageLoader from "../../libs/util/imageLoader"

class BulletImg extends Component {
  render() {
    const bullet = this.props.bullet
    const top = (parseInt(bullet.y) - parseInt(bullet.size)/2) + "px"
    const left = (parseInt(bullet.x) - parseInt(bullet.size)/2) + "px"
    const img = bullet.img
    const size = bullet.size + "px"
    return (
        <Img src={ImageLoader.loadSrc(img)} 
          style={{position: "absolute", top: top, left: left, height: size, width: size}} 
          alt={"bullet"}
        />
    )
  }
}

export default BulletImg