import React, { Component } from "react";
import * as THREE from "three";

class Dice extends Component {


  state = {
    color: 'pink'
  }

  colorChanger(){
    console.log('changin colors')
    console.log('this', this)
    this.setState({
      color: 'skyblue'
    })
  }


  componentDidMount() {
    let camera, scene, renderer;
    let geometry, material, mesh, line;
    let lineColor = this.state.color

      // Camera
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      camera.position.z = 10;
      scene = new THREE.Scene();
      
        
      // Polygon
      let poly = new THREE.IcosahedronGeometry(2, 0)
      var edges = new THREE.EdgesGeometry( poly );
      // const lineColor = this.state.color
      line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: lineColor }) );
      // scene.add(line);





      // Shapes
      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let icosa = new THREE.IcosahedronGeometry(1, 0);
      let dodeca = new THREE.DodecahedronGeometry(1, 0);
      let tetra = new THREE.TetrahedronGeometry(1, 0);
      let octa = new THREE.OctahedronGeometry(1, 0);
      let cube = new THREE.BoxGeometry(1, 0);
      let trapezTop = new THREE.ConeGeometry(2, 2, 6)
      let trapezBot = new THREE.ConeGeometry(2, 2, 6)
      var trapez = new THREE.Geometry();



      icosa.translate(0, 0, 0)
      dodeca.translate(-5, 4, 1)
      tetra.translate(-3, 2, 2)
      octa.translate(5, 0, 0)
      cube.translate(-5, 0, 0)
      trapezBot.rotateX(Math.PI)
      trapezTop.translate(0, 1, 0)
      trapezBot.translate(0, -1, 0)


      material = new THREE.MeshNormalMaterial({ wireframe: false});
      let d00top = new THREE.Mesh(trapezTop, material)
      let d00bot = new THREE.Mesh(trapezBot, material)
      let d20 = new THREE.Mesh(icosa, material);
      let d12 = new THREE.Mesh(dodeca, material);
      let d8 = new THREE.Mesh(octa, material);
      let d6 = new THREE.Mesh(cube, material);
      let d4 = new THREE.Mesh(tetra, material);


      d00top.updateMatrix(); // as needed
      trapez.merge(d00top.geometry, d00top.matrix);

      d00bot.updateMatrix(); // as needed
      trapez.merge(d00bot.geometry, d00bot.matrix);
      // Once merged, create a mesh from the single geometry and add to the scene:

      // var material = new THREE.MeshPhongMaterial({color: 0xFF0000});
      var mezh = new THREE.Mesh(trapez, material);
      scene.add(mezh);



      // scene.add(d20);
      // scene.add(d12);
      // scene.add(d8);
      // scene.add(d6);
      // scene.add(d4);


      //GEOMETRY
      var geometry1 = new THREE.BufferGeometry();
      var color = new THREE.Color();
      var colors1 = [];


      for (let i = 0; i < 10; i++) {
        color.setHSL( 0.6, 1.0, Math.max( 0, - 1 / 200 ) + 0.5 );
        colors1.push( color.r, color.g, color.b );
      }

      geometry1.setAttribute( 'color', new THREE.Float32BufferAttribute( colors1, 3 ) );


      // Render
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      animate()

    function animate() {
      requestAnimationFrame(animate);

      d20.rotation.x += 0.01;
      d20.rotation.y += 0.02;

      // d00.rotation.y += 0.01

      // d4.rotation.y += 0.02;

      mezh.rotation.y += 0.01

      d12.rotateX += 0.41;

      line.rotation.x -= 0.01;

      renderer.render(scene, camera);
    }

  }


  render() {
    return(  
      <div>
        ⏣ become one with inner selfness ⏣
        <button onClick={() => this.colorChanger()} >Clicker</button>
      </div>
    
  )}
}

export default Dice;
