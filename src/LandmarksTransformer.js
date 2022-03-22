import {
  FaceMesh, VERSION, FACEMESH_FACE_OVAL, FACEMESH_RIGHT_EYE, FACEMESH_LEFT_EYE,
  FACEMESH_RIGHT_IRIS, FACEMESH_LEFT_IRIS
} from "@mediapipe/face_mesh"

export default class LandmarksTransformer {

  constructor() {

    this.running = false

    console.log("FACEMESH_LEFT_IRIS", FACEMESH_LEFT_IRIS)
    console.log("FACEMESH_RIGHT_IRIS", FACEMESH_RIGHT_IRIS)

    this.leftIrisLandmarkIndex = FACEMESH_LEFT_IRIS[0][0]
    this.rightIrisLandmarkIndex = FACEMESH_RIGHT_IRIS[1][0]

    console.log(this.leftIrisLandmarkIndex, this.rightIrisLandmarkIndex)
    
  }


  extractHeadPosition = (landmarks, headPosition) => {

    if (landmarks) {
      const leftIris = landmarks[this.leftIrisLandmarkIndex]
      const rightIris = landmarks[this.rightIrisLandmarkIndex]

      headPosition.x = (leftIris.x + rightIris.x) / 2
      headPosition.y = (leftIris.y + rightIris.y) / 2
      headPosition.z = (leftIris.z + rightIris.z) / 2
    }
  }
}