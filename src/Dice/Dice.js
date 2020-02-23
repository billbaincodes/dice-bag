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
        80,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      camera.position.z = 8;
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



      //Lathe
      var points = [
        new THREE.Vector2(0, -1),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(2, 1),
        new THREE.Vector2(1, 2),
        new THREE.Vector2(0, 3),
      ];
      var lathe = new THREE.LatheGeometry( points );
      // var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      var lathe = new THREE.Mesh( lathe, material );
      scene.add( lathe );



      d10top.updateMatrix(); // as needed
      trapez.merge(d10top.geometry, d10top.matrix);

      d10bot.updateMatrix(); // as needed
      trapez.merge(d10bot.geometry, d10bot.matrix);

      trapez.translate(-8, 6, 0)
      // Once merged, create a mesh from the single geometry and add to the scene:

      
      var mezh = new THREE.Mesh(trapez, material);
      scene.add(mezh);



      // scene.add(d20);
      scene.add(d12);
      scene.add(d8);
      scene.add(d6);
      scene.add(d4);


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

      // d10.rotation.y += 0.01

      // d4.rotation.y += 0.02;

      // mezh.rotation.y += 0.01
      // mezh.rotation.x += 0.01

      lathe.rotation.x += 0.01;
      lathe.rotation.y += 0.01;

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
