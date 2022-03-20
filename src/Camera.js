import React from "react"

export default class Camera extends React.Component {

  constructor(props) {
    super(props);
    this.cameraRef = React.createRef();
    this.outputRef = React.createRef();
  }

  startCamera = () => {

    console.log("seofijsoefijseofijseif")

    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {

      console.log(stream)

      const camera = document.getElementById("camera");
      console.log(camera)

      camera.srcObject = stream;

      // camera.onloadedmetadata = function(e) {
      //   console.log("playing")
      //   camera.play();
      // };

    }).catch(function () {
      console.log("could not connect stream");
    });
  }

  startOutput = () => {

    console.log(this.outputRef)

    // const output = document.getElementById("output");
    const outputContext = this.outputRef.current.getContext("2d");

    // const camera = document.getElementById("camera");
    console.log(outputContext)

    outputContext.drawImage(this.cameraRef.current, 0, 0);

  }




  render() {
    return <div>

      <video id="camera" autoPlay ref={this.cameraRef}></video>
      <canvas id="output" ref={this.outputRef}></canvas>

      <button onClick={this.startCamera}>camera</button>
      <button onClick={this.startOutput}>output</button>

    </div>
  }


}