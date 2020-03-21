import React, { Component } from "react";
import * as THREE from "three";

class OnClick extends Component {

  componentDidMount() {
    this.init();
  }

  init() {
    console.log('init bissssh')
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    // scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );

    var light = new THREE.DirectionalLight( 0xffffff, 2 );

    light.position.set( 30, 10, 1 ).normalize();
    scene.add( light );

    var cubeGeometry = new THREE.BoxGeometry(20,20,20);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x999999, wireframe: false});  
    let material = new THREE.MeshNormalMaterial()
    var object = new THREE.Mesh(cubeGeometry, material);

      object.position.x = 0;  
      object.position.y = 0;  
      object.position.z = 0;

    scene.add( object );

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100)

    camera.position.z = 70
    renderer.setSize(window.innerWidth / window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate();
  }

  render() {
    return (
      <div>
        ⏣ become one with mouse events ⏣
      <div id='viewPort'></div>
      </div>
    );
  }
}

export default OnClick;
