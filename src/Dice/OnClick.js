import React, { Component } from "react";
import * as THREE from "three";

class OnClick extends Component {

  componentDidMount() {
    this.pixar();
  }

  pixar() {
    console.log('init bissssh');
    let scene = new THREE.Scene();
    // scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );

    var light = new THREE.DirectionalLight( 0xffffff, 2 );

    light.position.set( 30, 10, 1 ).normalize();
    scene.add( light );

    var cubeGeometry = new THREE.BoxGeometry(3,3,3);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x999999, wireframe: false});  
    var object = new THREE.Mesh(cubeGeometry, cubeMaterial);

    object.rotateX(10)
    object.rotateY(10);

    scene.add( object );

    let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 100)

    camera.position.z = 15
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)

    // Event Listener
    var mouse = new THREE.Vector2(), INTERSECTED;

    let raycaster = new THREE.Raycaster();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.sortObjects = false;


    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    const onDocumentMouseDown = (event) => {
      event.preventDefault();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // find intersections
      raycaster.setFromCamera( mouse, camera );
      var intersects = raycaster.intersectObjects( scene.children );
      if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].object ) {
          if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
          INTERSECTED = intersects[ 0 ].object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.color.setHex( 0xff0000 );
            console.log(intersects.length);
        }
      } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
      }
    }

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );   
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
