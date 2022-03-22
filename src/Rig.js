import React from "react"
import * as THREE from "three"

// https://codepen.io/mediapipe/pen/jOMbvxw?editors=1000
// https://3d.kalidoface.com/

export default class Rig extends React.Component {

  constructor(props) {
    super(props)
    this.rigContainerRef = React.createRef()
    this.running = false
  }

  start() {

    if (this.running) {
      return
    }

    this.rigContainer = this.rigContainerRef.current

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(400, 300)
    this.rigContainer.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 500)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)
    camera.position.z = 5;

    const scene = new THREE.Scene()


    const material = new THREE.MeshPhongMaterial({
      ambient: 0x555555,
      color: 0x555555,
      specular: 0xffffff,
      shininess: 50,
      shading: THREE.SmoothShading
    })
      
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(), material)
    scene.add(this.cube)

    scene.add( new THREE.AmbientLight(0xff0040) );
    const light = new THREE.PointLight(0xffffff, 6, 40);
    light.position.set(20, 20, 20);
    scene.add(light);


    const cube = this.cube



    function animate() {
      requestAnimationFrame(animate);

      // cube.position.x += 0.01

      // cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera)
    };

    this.running = true
    animate()
  }

  updateHeadPosition(position) {
    this.cube.position.x = position.x
  }

  render() {
    return <div id="rig_container" ref={this.rigContainerRef}></div>
  }
}