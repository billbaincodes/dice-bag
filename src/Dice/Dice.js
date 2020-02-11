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
    console.log(this)
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
      camera.position.z = 5;
      scene = new THREE.Scene();
      
        
      // Polygon
      let poly = new THREE.IcosahedronGeometry(2, 0)
      var edges = new THREE.EdgesGeometry( poly );
      // const lineColor = this.state.color
      line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: lineColor }) );
      scene.add(line);

      // Shapes
      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let d20 = new THREE.IcosahedronGeometry(1, 0)
      material = new THREE.MeshNormalMaterial({ wireframe: false});
      mesh = new THREE.Mesh(d20, material);
      scene.add(mesh);


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

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

      line.rotation.x -= 0.01;

      renderer.render(scene, camera);
    }

  }


  render() {
    return <div>
    ⏣ become one with inner selfness ⏣
    <button onClick={() => this.colorChanger()} >Clicker</button>
    </div>;
  }
}

export default Dice;
