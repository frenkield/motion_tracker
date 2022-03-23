import React from "react"
import * as THREE from "three"

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

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(400, 300)
    this.rigContainer.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 500)
    this.camera.position.set(0, 0, 100)
    this.camera.lookAt(0, 0, 0)
    this.camera.position.z = 5;

    this.scene = new THREE.Scene()
    this.addObjectsToScene()
    this.addLightsToScene()

    this.running = true
    this.animate()
  }

  addObjectsToScene() {

    const material = new THREE.MeshPhongMaterial({
      ambient: 0x555555,
      color: 0x555555,
      specular: 0xffffff,
      shininess: 50,
      shading: THREE.SmoothShading
    })
      
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(), material)
    this.scene.add(this.cube)
  }

  addLightsToScene() {
    this.scene.add(new THREE.AmbientLight(0xff0040));
    const light = new THREE.PointLight(0xffffff, 6, 40);
    light.position.set(20, 20, 20);
    this.scene.add(light);
  }

  animate = () => {

    requestAnimationFrame(this.animate);

    const headPosition = this.props.headPosition

    this.cube.position.x = headPosition.x * 5 - 2.5
    this.cube.position.y = -headPosition.y * 5 + 2.5
    this.cube.position.z = Math.min(headPosition.z * 100 - 2, 3)

    this.cube.rotation.y = headPosition.longitude
    this.cube.rotation.x = headPosition.latitude

    this.renderer.render(this.scene, this.camera)
  };

  render() {
    return <div id="rig_container" ref={this.rigContainerRef}></div>
  }
}