import React, { Component } from 'react'
import * as THREE from 'three'
import Physijs from 'physijs-webpack'

class Physics extends Component {

  componentDidMount() {
    console.log({ Physijs });


    Physijs.worker = '/js/physijs_worker.js';
    Physijs.ammo = '/js/ammo.js';
    
    let plane, initScene, render, renderer, scene, camera, box;
    
    initScene = function() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize( window.innerWidth, window.innerHeight );
      console.log({ document });
      document.getElementById('viewport').appendChild( renderer.domElement );
      
      scene = new Physijs.Scene();
      // scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
      
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
        new THREE.MeshBasicMaterial({ color: 'violet' })
      );

      scene.add( box );

      let table = new THREE.PlaneGeometry( 36, 36, 1 )
      table.translate(0, 0, 14)
      table.rotateX(1.5708)

      plane = new Physijs.PlaneMesh(
        table,
        new THREE.MeshBasicMaterial( {color: 'lightblue', side: THREE.DoubleSide} )
      )
      scene.add( plane );

      plane.addEventListener( 'collision');

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