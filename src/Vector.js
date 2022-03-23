export default class Vector {

  constructor(v) {
    this.x = v.x
    this.y = v.y
    this.z = v.z
  }

  subtract(v) {
    const vector = new Vector(this)
    vector.x -= v.x
    vector.y -= v.y
    vector.z -= v.z
    return vector
  }

  add(v) {
    const vector = new Vector(this)
    vector.x += v.x
    vector.y += v.y
    vector.z += v.z
    return vector
  }

  cross(v) {
    const vector = new Vector(this)
    vector.x = this.y * v.z - this.z * v.y
    vector.y = this.z * v.x - this.x * v.z
    vector.z = this.x * v.y - this.y * v.x
    return vector    
  }

  norm() {
    return Math.sqrt(this.x**2 + this.y**2 + this.z**2)
  }

  normalize() {
    const n = this.norm()
    this.x /= n
    this.y /= n
    this.z /= n
    return this
  }
}
