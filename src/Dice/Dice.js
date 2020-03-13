import React, { Component } from "react";
import * as THREE from "three";

class Dice extends Component {
  state = {
    color: 0xfffff,
    spinSpeed: 0.01
  };

  spinSpeed = 0.01;

  scene;
  camera;
  renderer;

  colorChanger() {
    let chars = "12345678abcdef";
    let randomSet = [];
    for (let i = 0; i < 6; i++) {
      let n = Math.ceil(Math.random()*14);
      randomSet.push(chars[n]);
    }
    let randomColor = randomSet.join("");

    this.setState({
      color: `0x${randomColor}`
    });
  }

  setSpeed() {
    if (this.state.spinSpeed < 0.2) {
      this.setState({
        spinSpeed: (this.state.spinSpeed += 0.05)
      });
    } else {
      this.setState({
        spinSpeed: 0.01
      });
    }
  }

  componentDidMount() {
    this.pixar();
  }

  pixar() {
    let camera, scene, renderer;
    let geometry, material, mesh, line;
    let lineColor = this.state.color;

    // Camera
    camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.z = 9;
    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.5)
    scene.add( ambientLight )

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    pointLight.position.set( 25, 50, 25 );
    scene.add( pointLight );

    // Polygon
    let poly = new THREE.IcosahedronGeometry(2, 0);
    let edges = new THREE.EdgesGeometry(poly);
    // lineColor = this.state.color
    line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: lineColor })
    );
    // scene.add(line);

    // Shapes
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    let icosa = new THREE.IcosahedronGeometry(1, 0);
    let dodeca = new THREE.DodecahedronGeometry(1, 0);
    let tetra = new THREE.TetrahedronGeometry(1, 0);
    let octa = new THREE.OctahedronGeometry(1, 0);
    let cube = new THREE.BoxGeometry(1, 0);
    let trapezTop = new THREE.ConeGeometry(1, 1, 6);
    let trapezBot = new THREE.ConeGeometry(1, 1, 6);
    let trapez = new THREE.Geometry();

    icosa.translate(0, 0, 0);
    dodeca.translate(-8, 4, 0);
    tetra.translate(-8, -6, 0);
    octa.translate(-8, -2, 0);
    cube.translate(-8, -4, 0);
    trapezBot.rotateX(Math.PI);
    trapezTop.translate(0, 0.5, 0);
    trapezBot.translate(0, -0.5, 0);

    // material = new THREE.MeshNormalMaterial({ color:0x000000 });
    // material = new THREE.MeshBasicMaterial({ color: 'red'})
    material = new THREE.MeshStandardMaterial( { color: 0xff0051 })
    let d10top = new THREE.Mesh(trapezTop, material);
    let d10bot = new THREE.Mesh(trapezBot, material);
    let d20 = new THREE.Mesh(icosa, material);
    let d12 = new THREE.Mesh(dodeca, material);
    let d8 = new THREE.Mesh(octa, material);
    let d6 = new THREE.Mesh(cube, material);
    let d4 = new THREE.Mesh(tetra, material);

    d10top.updateMatrix(); // as needed
    trapez.merge(d10top.geometry, d10top.matrix);

    d10bot.updateMatrix(); // as needed
    trapez.merge(d10bot.geometry, d10bot.matrix);

    trapez.translate(-8, 6, 0);

    let mezh = new THREE.Mesh(trapez, material);
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
      requestAnimationFrame(animate);

      d20.rotation.x += 0.01
      d20.rotation.y += 0.01

      line.rotation.x += 0.01;
      line.rotation.y += this.state.spinSpeed;

      line.material.color.setHex(this.state.color);

      d6.material.color.setHex(this.state.color);
      d6.material.needsUpdate = true

      renderer.render(scene, camera);
    };

    animate();
  }

  colorSet(event){
    let color = event.target.value
    color = color.replace('#', '0x')
    console.log({ color });
    this.setState({
      color
    })
  }

  render() {
    return (
      <div>
        ⏣ become one with inner selfness ⏣
        <button onClick={() => this.colorChanger()}>Random Color!</button>
        <button onClick={() => this.setSpeed()}>Faster!!</button>
        <label htmlFor='color-set'>Choose Color: </label>
        <input onChange={(e) => this.colorSet(e)} id='color-set' type='color'></input>
      </div>
    );
  }
}

export default Dice;
