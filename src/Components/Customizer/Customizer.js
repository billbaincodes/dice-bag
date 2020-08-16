import React, { Component } from "react";
import * as THREE from "three";
import "./Customizer.scss";

// Texture maps
import mapWood from '../../assets/wood.png'
import mapStar from '../../assets/stars.jpg'
import mapMetal from '../../assets/metal.jpg'
import mapWater from '../../assets/water.jpg'


const dice = {
  d4: { material: 'basic', color: 'blue' },
  d6: { material: 'basic', color: 'blue' },
  d8: { material: 'basic', color: 'blue' },
  d10: { material: 'basic', color: 'blue' },
  d12: { material: 'basic', color: 'blue' },
  d20: { material: 'basic', color: 'blue' },
  d100: { material: 'basic', color: 'blue' },
}

class Customizer extends Component {

  constructor(props) {
    console.log('constructing')
    super(props);
    this.state = {
      name: this.props.bag.name,
      color: 0xeb4034,
      material: 'basic',
      current: 'd20',
    };
  }

  componentDidMount() {
    console.log(' mountin ');
    this.setState({ name: this.props.bag.name });
    this.pixar();
  }

  namer = (e) => {
    let name = e.target.value
    this.setState({ name });
  }

  pixar() {
    let scene, renderer, camera, material;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 4;

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(25, 50, 25);
    scene.add(pointLight)

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

    // Meshes
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

    // Arrange d10 / 100 
    trapezBot.rotateX(Math.PI);
    trapezTop.translate(0, 0.5, 0);
    trapezBot.translate(0, -0.5, 0);
    trapezBot2.rotateX(Math.PI);
    trapezTop2.translate(0, 0.5, 0);
    trapezBot2.translate(0, -0.5, 0);
    trapez.merge(d10top.geometry, d10top.matrix);
    trapez.merge(d10bot.geometry, d10bot.matrix);
    trapez2.merge(d100top.geometry, d100top.matrix);
    trapez2.merge(d100bot.geometry, d100bot.matrix);


    // Textures
    const loader = new THREE.TextureLoader();
    let basic = new THREE.MeshStandardMaterial();
    let wood = new THREE.MeshStandardMaterial({ map: loader.load(mapWood), name: 'wood'});
    let star = new THREE.MeshStandardMaterial({ map: loader.load(mapStar), name: 'star'});
    let metal = new THREE.MeshStandardMaterial({ map: loader.load(mapMetal), name: 'metal'});
    let water = new THREE.MeshStandardMaterial({ map: loader.load(mapWater), name: 'water'});
    let synthwave = new THREE.MeshNormalMaterial({ wireframe: false });
    let lambert = new THREE.MeshLambertMaterial({ flatShading: false, color: 'red', emissive: 'red'});
    let tron = new THREE.MeshNormalMaterial({ wireframe: true });
    const textureList = {
      wood, star, synthwave, basic, lambert, metal, tron, water
    }

    // Apply config from state
    let dice = { d4, d6, d8, d10, d12, d20, d100 };
    let selection = dice[this.state.current]
    selection.material = textureList[this.state.material];
    selection.material.color.setHex(this.state.color);
    scene.add(selection)
    selection.rotation.x = 0.35

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('lightblue');
    renderer.setSize(450, 450);
    document.body.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera);
      selection.rotation.y += 0.002
    };

    animate();
  }

  materialPicker(event){
    console.log('mat', event.target.value);
    // this.setState({ material })
  }

  // TODO: Debounce
  colorPicker(event){
    let color = event.target.value;
    color = color.replace("#", "0x");
    this.setState({ color }, () => {
      this.pixar();
    })
  }

  diePicker(die){
    this.setState({ current: die }, () => {
      this.pixar();
    })
  }


  render() {
    const { bag } = this.props;
    return (
      <div>
        <div class='main'>
          <h2>{bag.name}</h2>
          <div>
            <button onClick={() => this.diePicker('d4')}>d4</button>
            <button onClick={() => this.diePicker('d6')}>d6</button>
            <button onClick={() => this.diePicker('d8')}>d8</button>
            <button onClick={() => this.diePicker('d10')}>d10</button>
            <button onClick={() => this.diePicker('d12')}>d12</button>
            <button onClick={() => this.diePicker('d20')}>d20</button>
            <button onClick={() => this.diePicker('d100')}>d100</button>
          </div>
          <form>
            <div>
              <div class='color-set d-flex'>
                <label htmlFor="color-set">Choose Color:&nbsp;</label>
                <input
                  onChange={(event) => this.colorPicker(event)}
                  id="color-set"
                  type="color">
                </input>
              </div>
              <label>Select a Texture:&nbsp;</label>
              <select onSelect={() => this.materialPicker()}>
                <option value='plastic'>Plastic</option>
                <option value='metal'>Metal</option>
                <option value='wood'>Wood</option>
                <option value='star'>Star</option>
              </select>
            </div>
          </form>
          <div>
            <label>Special:&nbsp;</label>
            <select>
              <option value='rainbow'>Rainbow</option>
              <option value='plastic'>Tron</option>
              <option value='plastic'>SynthWave</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Customizer;