import React from "react"

export default class Camera extends React.Component {


  // navigator.mediaDevices.getUserMedia({video: true})
  // .then(function(stream) {
  //   console.log(stream)

  //   camera = document.getElementById("camera");

  //   camera.srcObject = stream;

  //   camera.onloadedmetadata = function(e) {
  //     console.log("playing")
  //     camera.play();
  //   };

  // }).catch(function() {
  //   console.log("could not connect stream");
  // });

  startCamera = () => {

    console.log("seofijsoefijseofijseif")

      navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {

        console.log(stream)

        const camera = document.getElementById("camera");
        console.log(camera)

        camera.srcObject = stream;

        // camera.onloadedmetadata = function(e) {
        //   console.log("playing")
        //   camera.play();
        // };

    }).catch(function() {
      console.log("could not connect stream");
    });
  }

  startOutput = () => {

    const output = document.getElementById("output");
    const outputContext = output.getContext("2d");
    
    const camera = document.getElementById("camera");

    outputContext.drawImage(camera, 0, 0);


    // outputContext.drawImage(inputCanvasElement,0,0);
  
  }





  render() {
    return <div>
      <button onClick={this.startCamera}>camera</button>
      <button onClick={this.startOutput}>output</button>
    </div>
  }


}