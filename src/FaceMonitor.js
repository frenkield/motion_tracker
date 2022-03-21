import React from "react"

import {FaceMesh, VERSION} from "@mediapipe/face_mesh"
import {Camera} from '@mediapipe/camera_utils'

export default class FaceMonitor extends React.Component {

  constructor(props) {

    super(props);
    this.cameraRef = React.createRef();
    this.outputRef = React.createRef();


  }

  startCamera = () => {

    const faceMeshVersion = VERSION

    const config = {locateFile: (file) => {

      const filename = `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
                       `${faceMeshVersion}/${file}`;

      console.log(filename)

      return filename;
    }}


    this.faceMesh = new FaceMesh(config);
    this.faceMesh.onResults(this.onResults);

    console.log("facemesh", this.faceMesh)
    console.log("cameraref", this.cameraRef)

    const camera = new Camera(this.cameraRef.current, {
      onFrame: async () => {
        await this.faceMesh.send({ image: this.cameraRef.current });
      },
      width: 1280,
      height: 720,
    });

    camera.start();



    // navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {

    //   console.log(stream)

    //   const camera = document.getElementById("camera");
    //   console.log("camera", camera)

    //   camera.srcObject = stream;

    // }).catch(function () {
    //   console.log("could not connect stream");
    // });
  }

  startOutput = () => {

    // const outputContext = this.outputRef.current.getContext("2d");
    // outputContext.drawImage(this.cameraRef.current, 0, 0);

    // const mpFaceMesh = window;

    // const config = {
    //   locateFile: (file) => {
    //     return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
    //       `${mpFaceMesh.VERSION}/${file}`;
    //   }
    // };

    // const faceMesh = new FaceMesh(config);
    // faceMesh.onResults(this.onResults);

  }


  onResults = () => {
    console.log("sefef")
  }


  render() {
    return <div>

      <video id="camera" autoPlay ref={this.cameraRef}></video>
      <canvas id="output" ref={this.outputRef}></canvas>

      <button onClick={this.startCamera}>camera</button>
      {/* <button onClick={this.startOutput}>output</button> */}

    </div>
  }


}