import { FACEMESH_RIGHT_IRIS, FACEMESH_LEFT_IRIS } from "@mediapipe/face_mesh"

export default class LandmarksTransformer {

  constructor() {

    this.leftIrisLandmarkIndex = FACEMESH_LEFT_IRIS[0][0]
    this.rightIrisLandmarkIndex = FACEMESH_RIGHT_IRIS[1][0]
    this.chinIndex = 152
  }

  extractHeadPosition = (landmarks, headPosition) => {

    if (landmarks) {

      const leftIris = landmarks[this.leftIrisLandmarkIndex]
      const rightIris = landmarks[this.rightIrisLandmarkIndex]
      const chin = landmarks[this.chinIndex]

      headPosition.x = (leftIris.x + rightIris.x) / 2
      headPosition.y = (leftIris.y + rightIris.y) / 2
      headPosition.z = (leftIris.z + rightIris.z + chin.z * 2) / 3

      // console.log(chin)
    }
  }
}