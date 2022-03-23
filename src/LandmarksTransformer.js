import { FACEMESH_RIGHT_IRIS, FACEMESH_LEFT_IRIS } from "@mediapipe/face_mesh"
import Vector from "./Vector"
export default class LandmarksTransformer {

  constructor() {

    this.leftIrisLandmarkIndex = FACEMESH_LEFT_IRIS[0][0]
    this.rightIrisLandmarkIndex = FACEMESH_RIGHT_IRIS[1][0]
    this.chinIndex = 152



    // const v = new Vector({x:1, y:1, z:1})
    // console.log(v.norm())
    // console.log(v.normalize())

    // const v1 = new Vector({x:0.3642229242809535, y:0.21591807938561325, z:0.5819032448659286})
    // const v2 = new Vector({x:0.8790460593860366, y:0.05947685187926244, z:0.165321781515252})
    // const cross = v1.cross(v2)
    // console.log(cross)
    // console.log(cross.normalize())
  }

  extractHeadPosition = (landmarks, headPosition) => {

    const leftIris = new Vector(landmarks[this.leftIrisLandmarkIndex])
    const rightIris = new Vector(landmarks[this.rightIrisLandmarkIndex])
    const chin = new Vector(landmarks[this.chinIndex])

    headPosition.x = (leftIris.x + rightIris.x) / 2
    headPosition.y = (leftIris.y + rightIris.y) / 2
    headPosition.z = (leftIris.z + rightIris.z + chin.z * 2) / 3

    const tangent1 = leftIris.subtract(chin)
    const tangent2 = rightIris.subtract(chin)

    const normal = tangent1.cross(tangent2).normalize()
    // console.log(normal)

    headPosition.longitude = normal.x
    headPosition.latitude = normal.y
  }
}