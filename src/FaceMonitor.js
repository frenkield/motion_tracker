import React from "react"

import { FaceMesh, VERSION, FACEMESH_RIGHT_EYE, FACEMESH_LEFT_EYE } from "@mediapipe/face_mesh"
import { Camera } from "@mediapipe/camera_utils"
import { drawConnectors } from "@mediapipe/drawing_utils"

export default class FaceMonitor extends React.Component {

  constructor(props) {

    super(props)

    this.cameraRef = React.createRef()
    this.canvasRef = React.createRef()

    this.initializeFaceMesh()
  }

  initializeFaceMesh() {

    const faceMeshVersion = VERSION

    const config = {
      locateFile: (file) => {

        const filename = `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
          `${faceMeshVersion}/${file}`;
        return filename;
      }
    }

    this.faceMesh = new FaceMesh(config);
    this.faceMesh.onResults(this.onResults);
  }

  start = () => {

    this.canvasElement = this.canvasRef.current
    this.canvasCtx = this.canvasElement.getContext('2d')

    const camera = new Camera(this.cameraRef.current, {
      onFrame: async () => {
        await this.faceMesh.send({ image: this.cameraRef.current });
      },
      width: 1280,
      height: 720,
    });

    camera.start();
  }

  onResults = (results) => {

    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width,
    //                          this.canvasElement.height);

    if (results.multiFaceLandmarks) {

      for (const landmarks of results.multiFaceLandmarks) {
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: "#FF3030"});
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: "#30FF30"});
      }
    }

    this.canvasCtx.restore();
  }

  render() {
    return <div>

      <video id="camera" autoPlay ref={this.cameraRef}></video>
      <canvas id="output" ref={this.canvasRef}></canvas>

      <div>
        <button onClick={this.start}>start</button>
      </div>

    </div>
  }
}