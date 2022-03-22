import { useRef } from "react"
import './App.css'
import FaceMonitor from './FaceMonitor'
import Rig from './Rig'

function App() {

  const faceMonitorRef = useRef()
  const rigRef = useRef()
  const headPosition = {x:0, y:0, z:0}

  const start = () => {
    console.log("start")
    rigRef.current.start()
  }

  const stop = () => {
    console.log("stop")
    headPosition.x += 0.1
    rigRef.current.updateHeadPosition(headPosition)
  }

  return (

    <div className="App">

      <FaceMonitor ref={faceMonitorRef} />
      <Rig ref={rigRef} />

      <div>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>

    </div>
  )
}

export default App;
