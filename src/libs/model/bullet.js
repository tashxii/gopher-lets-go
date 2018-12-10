class Bullet {
  constructor(id, x, y, special) {
    this.id = id
    this.x = x
    this.y = y
    this.size = (special === "true") ? "40" : "30"
    this.img = (special === "true") ? "missile.png" : "bomb.png"
  }
}

export default Bullet