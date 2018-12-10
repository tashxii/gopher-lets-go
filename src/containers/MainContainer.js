import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import MainPage from "../components/pages/MainPage"
import { showPlayerEvent, fireBombEvent, fireMissileEvent, refreshStartEvent} from "../actions";
import Gopher from "../libs/model/gopher"

let chargingTimerid
let chargedTimerid

const mapStateToProps = (state)=> ({
  entryState: state.entryState,
  gopherState: state.gopherState,
  bulletState: state.bulletState,
  dmgState: state.dmgState,
})

const mapDispatchToProps = (dispatch) =>({
  onRefresh: (id) => {
    dispatch(refreshStartEvent(id))
  },

  onMouseMove: (gopher, x, y) => {
    dispatch(showPlayerEvent(
      gopher.id, gopher.name, gopher.life,
      x, y, gopher.size, gopher.charge,
    ))
  },

  onMouseDown: (gopher) => {
    if (Number(gopher.life) <= 0) return
    if (gopher.charge === "none") {
      chargingTimerid = setTimeout(()=>{
        //Start charging
        dispatch(showPlayerEvent(
          gopher.id, gopher.name, gopher.life,
          gopher.x, gopher.y, gopher.size, Gopher.CHARGE_CHARGING,
        ))
        //Charging
        chargedTimerid = setTimeout(()=>{
          gopher.charge = Gopher.CHARGE_CHARGED
          dispatch(showPlayerEvent(
            gopher.id, gopher.name, gopher.life,
            gopher.x, gopher.y, gopher.size, Gopher.CHARGE_CHARGED,
          ))
          }, 700);
      }, 300);
    }
  },

  onMouseUp: (gopher, direction) => {
    const fireMissile = (gopher.charge === Gopher.CHARGE_CHARGED)
    gopher.charge = Gopher.CHARGE_NONE
    if(chargingTimerid) {
      clearTimeout(chargingTimerid);
      chargingTimerid = undefined;
    }
    if(chargedTimerid) {
      clearTimeout(chargedTimerid);
      chargedTimerid = undefined;
    }
    if (Number(gopher.life) <= 0) return
    if (fireMissile) {
      dispatch(fireMissileEvent(
        gopher.id, gopher.x, gopher.y, direction,
      ))
    } else {
      dispatch(fireBombEvent(
        gopher.id, gopher.x, gopher.y, direction,
      ))
    }
    dispatch(showPlayerEvent(
      gopher.id, gopher.name, gopher.life,
      gopher.x, gopher.y, gopher.size, Gopher.CHARGE_NONE,
    ))
  },
})

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage)

export default withRouter(MainContainer)