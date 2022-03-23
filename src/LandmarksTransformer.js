import { FACEMESH_RIGHT_IRIS, FACEMESH_LEFT_IRIS } from "@mediapipe/face_mesh"
import Vector from "./Vector"
export default class LandmarksTransformer {

  constructor() {

    this.leftIrisLandmarkIndex = FACEMESH_LEFT_IRIS[0][0]
    this.rightIrisLandmarkIndex = FACEMESH_RIGHT_IRIS[1][0]
    this.chinIndex = 152
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