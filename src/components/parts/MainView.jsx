import React, {Component} from "react"
import GopherImg from "../basics/GopherImg"
import BulletImg from "../basics/BulletImg"

const mainViewStyle = {height: "90vh", width: "90vw", position: "absolute"}


class EntryForm extends Component {
  constructor(props) {
    super(props)
    const player = this.props.gopherState[this.props.entryState.id]
    this.state = {
      player: player,
      prevX: player.x,
      prevY: player.y,
      direction: 0,
    }
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  render() {
    const gophers = this.props.gopherState
    const bullets = this.props.bulletState
    return (
      <div 
        style={mainViewStyle}
        onMouseMove={this.onMouseMove} 
        onMouseDown={this.onMouseDown} 
        onMouseUp={this.onMouseUp}>
        { Object.keys(gophers).map((key) => {
          return (<GopherImg gopher={gophers[key]}/>)
        })}
        { Object.keys(bullets.bombs).map((key) => {
          return (<BulletImg bullet={bullets.bombs[key]}/>)
        })}
        { Object.keys(bullets.missiles).map((key) => {
          return (<BulletImg bullet={bullets.missiles[key]}/>)
        })}
      </div>
    )
  }

  onMouseMove(e) {
    const dx = e.pageX - this.state.prevX;
    const dy = e.pageY - this.state.prevY;
    if(dx == 0 && dy == 0) return 
    let direction
    if (Math.abs(dx)>=Math.abs(dy)) {
      direction = (dx>=0) ? 1 : 3;
    } else {
      direction = (dy>=0) ? 0 : 2;
    }
    const prevX = e.pageX;
    const prevY = e.pageY;
    //座標は文字列として渡す。（サーバーがすべて文字列を返すため）
    this.props.onMouseMove(this.state.player, ""+e.pageX, ""+e.pageY)
    this.setState({
      player: this.state.player,
      prevX: prevX,
      prevY: prevY,
      direction: direction,
    })
  }

  onMouseDown(e) {
    console.log("onMouseDown")
    this.props.onMouseDown(this.state.player)
  }

  onMouseUp(e) {
    console.log("onMouseUp")
    this.props.onMouseUp(this.state.player, this.state.direction)
  }
}

export default EntryForm


