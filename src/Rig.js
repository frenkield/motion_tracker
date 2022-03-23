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

    this.group = new THREE.Group();
    this.scene.add(this.group)

    const material = new THREE.MeshPhongMaterial({
      ambient: 0x555555,
      color: 0x555555,
      specular: 0xffffff,
      shininess: 50,
      shading: THREE.SmoothShading
    })
      
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(), material)
    this.group.add(this.cube)

    const direction = new THREE.Vector3(0, 0, 1);
    direction.normalize();

    const origin = new THREE.Vector3(0, 0, 0);

    const arrowHelper = new THREE.ArrowHelper(direction, origin, 2, 0xffffff);
    this.group.add(arrowHelper);
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

    this.group.position.x = headPosition.x * 5 - 2.5
    this.group.position.y = -headPosition.y * 5 + 2.5
    this.group.position.z = Math.min(headPosition.z * 100 - 2, 3)

    this.group.rotation.y = headPosition.longitude
    this.group.rotation.x = headPosition.latitude

    this.renderer.render(this.scene, this.camera)
  };

  render() {
    return <div id="rig_container" ref={this.rigContainerRef}></div>
  }
}