import uuidv4 from "../util/generateId"

class Gopher {
  static CHARGE_NONE = "none"
  static CHARGE_CHARGING = "charging"
  static CHARGE_CHARGED = "charged"

  constructor(id) {
    this.id = id
    this.name = ""
    this.x = "0"
    this.y = "0"
    this.life = "5"
    this.size = "100"
    this.charge = Gopher.CHARGE_NONE
  }
}

export default Gopher