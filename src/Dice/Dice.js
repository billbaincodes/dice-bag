import React, { Component } from "react";
import * as THREE from "three";
import './Dice.css'

class Dice extends Component {
  state = {
    color: 0xfffff,
    spinSpeed: 0.01,
    synthwave: false,
    rainbow: false,
  };

  spinSpeed = 0.01;

  scene;
  camera;
  renderer;

  colorRandomizer() {
    let chars = "12345678abcdefABCDEF";
    let randomSet = [];
    for (let i = 0; i < 6; i++) {
      let n = Math.ceil(Math.random() * 20);
      randomSet.push(chars[n]);
    }
    let randomColor = randomSet.join("");

    this.setState({
      color: `0x${randomColor}`
    });
  }

  setSpeed() {
    if (this.state.spinSpeed < 0.2) {
      let currSpeed = this.state.spinSpeed;
      this.setState({
        spinSpeed: (currSpeed += 0.05)
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
    let material, line;
    let lineColor = this.state.color;

    // Camera
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      .1,
      1000
    );
    camera.position.z = 14;
    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(25, 50, 25);
    scene.add(pointLight);

    // Polygon
    let poly = new THREE.IcosahedronGeometry(2, 0);
    let edges = new THREE.EdgesGeometry(poly);
    line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: lineColor })
    );
    scene.add(line);

    // Shapes
    let icosa = new THREE.IcosahedronGeometry(1, 0);
    let dodeca = new THREE.DodecahedronGeometry(1, 0);
    let tetra = new THREE.TetrahedronGeometry(1, 0);
    let octa = new THREE.OctahedronGeometry(1, 0);
    let cube = new THREE.BoxGeometry(1, 0);
    let trapezTop = new THREE.ConeGeometry(1, 1, 6);
    let trapezBot = new THREE.ConeGeometry(1, 1, 6);
    let trapez = new THREE.Geometry();
    let trapezTop2 = new THREE.ConeGeometry(1, 1, 6);
    let trapezBot2 = new THREE.ConeGeometry(1, 1, 6);
    let trapez2 = new THREE.Geometry();

    icosa.translate(6, -4, 0);
    dodeca.translate(3, -4, 0);
    octa.translate(-3, -4, 0);
    cube.translate(-6, -4, 0);
    tetra.translate(-9, -4, 0);
    trapezBot.rotateX(Math.PI);
    trapezTop.translate(0, 0.5, 0);
    trapezBot.translate(0, -0.5, 0);
    trapezBot2.rotateX(Math.PI);
    trapezTop2.translate(0, 0.5, 0);
    trapezBot2.translate(0, -0.5, 0);

    material = new THREE.MeshStandardMaterial({ color: 0xff0051 });
    let synthwave = new THREE.MeshNormalMaterial({ wireframe: false });
    let d100 = new THREE.Mesh(trapez2, material);
    let d100top = new THREE.Mesh(trapezTop, material);
    let d100bot = new THREE.Mesh(trapezBot, material);
    let d10 = new THREE.Mesh(trapez, material);
    let d10top = new THREE.Mesh(trapezTop, material);
    let d10bot = new THREE.Mesh(trapezBot, material);
    let d20 = new THREE.Mesh(icosa, material);
    let d12 = new THREE.Mesh(dodeca, material);
    let d8 = new THREE.Mesh(octa, material);
    let d6 = new THREE.Mesh(cube, material);
    let d4 = new THREE.Mesh(tetra, material);

    d100.name = 'd100'
    d20.name = 'd20'
    d12.name = 'd12'
    d10.name = 'd10'
    d8.name = 'd8'
    d6.name = 'd6'
    d4.name = 'd4'


    trapez.merge(d10top.geometry, d10top.matrix);
    trapez.merge(d10bot.geometry, d10bot.matrix);
    // d10bot.updateMatrix(); <- May not need
    trapez.translate(0, -4, 0);

    trapez2.merge(d100top.geometry, d100top.matrix);
    trapez2.merge(d100bot.geometry, d100bot.matrix);
    trapez2.translate(9, -4, 0);

    scene.add(d100)
    scene.add(d10);
    scene.add(d20);
    scene.add(d12);
    scene.add(d8);
    scene.add(d6);
    scene.add(d4);

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let hue = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      // d20.rotation.x += this.state.spinSpeed;
      // d20.rotation.y += 0.01;

      line.rotation.x += 0.01;
      line.rotation.y += this.state.spinSpeed;
      if (hue < 360) {
        hue += 0.5;
      } else {
        hue = 0;
      }
      var color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
      line.material.color.set(color);

      if (this.state.synthwave) {
        d20.material = synthwave;
      } else if (this.state.rainbow) {
        d20.material.color.set(color);
      } else {
        d20.material = material;
        d20.material.color.setHex(this.state.color);
      }
      d6.material.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // Event Listener
    var mouse = new THREE.Vector2(0, 0);
    let raycaster = new THREE.Raycaster();
    renderer.setClearColor('white');
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.sortObjects = false;
    let INTERSECTED;

    const onDocumentMouseDown = (event) => {
      event.preventDefault();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // find intersections
      raycaster.setFromCamera( mouse, camera );
      var intersects = raycaster.intersectObjects( scene.children );
      console.log({ intersects });

      intersects.forEach(intersect => {
        console.log(intersect.object.name)
      })
      // if ( intersects.length > 0 ) {
      //   if ( INTERSECTED != intersects[ 0 ].object ) {
      //     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      //     INTERSECTED = intersects[ 0 ].object;
      //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      //     INTERSECTED.material.color.setHex( 0xff0000 );
      //       console.log(intersects.length);
      //   }
      // } else {
      //   if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
      //   INTERSECTED = null;
      // }
    }

    document.addEventListener( 'mousedown', onDocumentMouseDown, false ); 

    animate();
  }

  colorSet(event) {
    let color = event.target.value;
    color = color.replace("#", "0x");
    this.setState({
      color
    });
  }

  colorSynth() {
    this.setState({
      synthwave: !this.state.synthwave
    });
  }

  render() {
    return (
      <div>
        ⏣ become one with inner selfness ⏣
        <button onClick={() => this.colorRandomizer()}>Random Color!</button>
        <button onClick={() => this.setSpeed()}>Faster!!</button>
        <label htmlFor="color-set">Choose Color: </label>
        <input
          onChange={e => this.colorSet(e)}
          id="color-set"
          type="color"
        ></input>
        <button onClick={() => this.colorSynth()}>s y n t h w a v e</button>
      </div>
    );
  }
}

export default Dice;
