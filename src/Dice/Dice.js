import React, { Component } from "react";
import * as THREE from "three";

class Dice extends Component {

  state = {
    color: 'green',
    scene: new THREE.Scene(),
    spinSpeed: 0.01
  }

  spinSpeed = 0.01

  scene
  camera
  renderer

  colorChanger(){
    console.log('changin colors')
    console.log('this', this)
    this.setState({
      color: 'blue',
      rotateSpeed: 0.01
    })
  }

  setSpeed(){
    if (this.state.spinSpeed < 0.2) {
      this.setState({
        spinSpeed: this.state.spinSpeed += 0.05
      })
    } else {
      this.setState({
        spinSpeed: 0.01
      })
    }
  }

  componentDidMount() {
    this.pixar()
  }

  pixar(){
    let camera, scene, renderer;
    let geometry, material, mesh, line;
    let lineColor = this.state.color

      // Camera
      camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      camera.position.z = 12;
      scene = new THREE.Scene();
      
      // Polygon
      let poly = new THREE.IcosahedronGeometry(2, 0)
      var edges = new THREE.EdgesGeometry( poly );
      // lineColor = this.state.color
      console.log({ lineColor })
      line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: lineColor }) );
      scene.add(line);

      // Shapes
      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let icosa = new THREE.IcosahedronGeometry(1, 0);
      let dodeca = new THREE.DodecahedronGeometry(1, 0);
      let tetra = new THREE.TetrahedronGeometry(1, 0);
      let octa = new THREE.OctahedronGeometry(1, 0);
      let cube = new THREE.BoxGeometry(1, 0);
      let trapezTop = new THREE.ConeGeometry(1, 1, 6)
      let trapezBot = new THREE.ConeGeometry(1, 1, 6)
      var trapez = new THREE.Geometry();


      icosa.translate(0, 0, 0)
      dodeca.translate(-8, 4, 0)
      tetra.translate(-8, -6, 0)
      octa.translate(-8, -2, 0)
      cube.translate(-8, -4, 0)
      trapezBot.rotateX(Math.PI)
      trapezTop.translate(0, 0.5, 0)
      trapezBot.translate(0, -0.5, 0)


      material = new THREE.MeshNormalMaterial({ wireframe: false });
      let d10top = new THREE.Mesh(trapezTop, material)
      let d10bot = new THREE.Mesh(trapezBot, material)
      let d20 = new THREE.Mesh(icosa, material);
      let d12 = new THREE.Mesh(dodeca, material);
      let d8 = new THREE.Mesh(octa, material);
      let d6 = new THREE.Mesh(cube, material);
      let d4 = new THREE.Mesh(tetra, material);

      d10top.updateMatrix(); // as needed
      trapez.merge(d10top.geometry, d10top.matrix);

      d10bot.updateMatrix(); // as needed
      trapez.merge(d10bot.geometry, d10bot.matrix);

      trapez.translate(-8, 6, 0)


      var mezh = new THREE.Mesh(trapez, material);
      scene.add(mezh);
      scene.add(d20);
      scene.add(d12);
      scene.add(d8);
      scene.add(d6);
      scene.add(d4);


      // Render
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const animate = () => {
        requestAnimationFrame( animate );

        line.rotation.x += 0.01;
        line.rotation.y += this.state.spinSpeed;

        line.color = '0xffffff'
      
        renderer.render( scene, camera );
      };

      animate()
  }



  render() {
    return(  
      <div>
        ⏣ become one with inner selfness ⏣
        <button onClick={() => this.colorChanger()} >Clicker</button>
        <button onClick={() => this.setSpeed()} >Faster!!</button>
      </div>
    
  )}
}

export default Dice;
