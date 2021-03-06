import React from "react"
import {
  FaceMesh, VERSION, FACEMESH_FACE_OVAL, FACEMESH_RIGHT_EYE, FACEMESH_LEFT_EYE,
  FACEMESH_RIGHT_IRIS, FACEMESH_LEFT_IRIS, FACEMESH_TESSELATION,
} from "@mediapipe/face_mesh"
import { Camera } from "@mediapipe/camera_utils"
import { drawConnectors } from "@mediapipe/drawing_utils"

export default class FaceMonitor extends React.Component {

  constructor(props) {

    super(props)

    this.cameraRef = React.createRef()
    this.canvasRef = React.createRef()

    this.initializeFaceMesh()
    this.running = false
  }

  initializeFaceMesh() {

    const config = {
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${VERSION}/${file}`;
      }
    }

    this.faceMesh = new FaceMesh(config);

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.faceMesh.onResults(this.onResults);
  }

  start = () => {

    this.canvasElement = this.canvasRef.current
    this.canvasCtx = this.canvasElement.getContext('2d')

    this.camera = new Camera(this.cameraRef.current, {
      onFrame: async () => {
        await this.faceMesh.send({ image: this.cameraRef.current });
      }
    });

    this.camera.start();
  }

  stop = () => {
    this.camera.stop()
  }

  onResults = (results) => {

    this.props.onResults(results)

    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width,
                             this.canvasElement.height);

    if (results.multiFaceLandmarks) {

      for (const landmarks of results.multiFaceLandmarks) {

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: "#FF3030"})
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: "#30FF30"})

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: "white"})
        drawConnectors(this.canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: "white"})

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_TESSELATION,
                       {color: '#C0C0C070', lineWidth: 1})

        drawConnectors(this.canvasCtx, landmarks, FACEMESH_FACE_OVAL, { color: '#E0E0E0' })
      }
    }

    this.canvasCtx.restore();
  }

  render() {
    return <React.Fragment>
        <video id="camera" autoPlay ref={this.cameraRef}></video>
        <canvas id="output" ref={this.canvasRef}></canvas>
      </React.Fragment>
  }
}