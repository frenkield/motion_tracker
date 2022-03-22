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
    const headPosition = this.props.headPosition

    function animate() {

      requestAnimationFrame(animate);

      cube.position.x = headPosition.x * 5 - 2.5
      cube.position.y = -headPosition.y * 5 + 2.5
      cube.position.z = Math.min(headPosition.z * 100 - 2, 3)

      cube.rotation.y += 0.01;

      renderer.render(scene, camera)
    };

    this.running = true
    animate()
  }

  render() {
    return <div id="rig_container" ref={this.rigContainerRef}></div>
  }
}