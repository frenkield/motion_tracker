import { useRef } from "react"
import './App.css'
import FaceMonitor from './FaceMonitor'
import LandmarksTransformer from "./LandmarksTransformer"
import Rig from './Rig'

function App() {

  const faceMonitorRef = useRef()
  const rigRef = useRef()
  const landmarksTransformer = new LandmarksTransformer()

  const headPosition = {x:0, y:0, z:0}

  const start = () => {
    console.log("start")
    rigRef.current.start()
    faceMonitorRef.current.start()
  }

  const stop = () => {
    console.log("stop")
    faceMonitorRef.current.stop()
    headPosition.x += 0.1
    rigRef.current.updateHeadPosition(headPosition)
  }

  const onFaceMonitorResults = (results) => {

    // console.log("results", results)

    if (results.multiFaceLandmarks) {

      const landmarks = results.multiFaceLandmarks[0]
      landmarksTransformer.extractHeadPosition(landmarks, headPosition)

      console.log("headPosition", headPosition)
    }
  }

  return (

    <div className="App">

      <FaceMonitor ref={faceMonitorRef} onResults={onFaceMonitorResults}/>
      <Rig ref={rigRef} headPosition={headPosition}/>

      <div>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>

    </div>
  )
}

export default App;
