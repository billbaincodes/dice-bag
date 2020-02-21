import React, { Component } from 'react'
import * as THREE from 'three'
import Physijs from 'physijs-webpack'

class Physics extends Component {

  componentDidMount() {
    // const Physijs = document.createElement("script");
    // Physijs.async = true;
    // Physijs.src = "../../node_modules/physijs/physi.js";
    // //For head
    // document.head.appendChild(Physijs);

    // // For body
    // document.body.appendChild(Physijs);

    console.log({ Physijs });


    Physijs.worker = '/js/physijs_worker.js';
    Physijs.ammo = '/js/ammo.js';
    
    var initScene, render, renderer, scene, camera, box;
    
    initScene = function() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize( window.innerWidth, window.innerHeight );
      console.log({ document });
      document.getElementById('viewport').appendChild( renderer.domElement );
      
      scene = new Physijs.Scene();
      
      camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set( 60, 50, 60 );
      camera.lookAt( scene.position );
      scene.add( camera );
      
      // Box
      box = new Physijs.BoxMesh(
        new THREE.CubeGeometry( 5, 5, 5 ),
        new THREE.MeshBasicMaterial({ color: 0x888888 })
      );
      scene.add( box );
      
      requestAnimationFrame( render );
    };
    
    render = function() {
      scene.simulate(); // run physics
      renderer.render( scene, camera); // render the scene
      requestAnimationFrame( render );
    };
    
    window.onload = initScene();
  }

  render(){
    return(
      <div id="viewport"></div>
    )
  }
}

export default Physics