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
    let geometry, material, mesh;
    let lineColor = this.state.color

    init();
    animate();

    function init() {
      // Camera
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      camera.position.z = 5;
      scene = new THREE.Scene();
      
      // Rainbow
      let colors = []
      var color = new THREE.Color();
				for ( var i = 0, l = 365; i < l; i ++ ) {
					color.setHSL( i / l, 1.0, 0.5 );
					colors.push( color.r, color.g, color.b );
        }
        
      // Polygon
      let poly = new THREE.IcosahedronGeometry(2, 0)
      var edges = new THREE.EdgesGeometry( poly );
      // const lineColor = this.state.color
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: lineColor }) );
      // scene.add( line );

      // Shapes
      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let d20 = new THREE.IcosahedronGeometry(1, 0)
      material = new THREE.MeshNormalMaterial({ wireframe: true});
      mesh = new THREE.Mesh(d20, material);
      scene.add(mesh);

      // Render
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
    }

    function animate() {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

      // material.color = 'blue'

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
