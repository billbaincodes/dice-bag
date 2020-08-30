import React, { Component } from "react";
import * as THREE from "three";
import "./Dice.scss";
import RollLog from '../RollLog/RollLog'
import Header from '../Header/Header'

import mapWood from '../../assets/wood.png'
import mapStar from '../../assets/stars.jpg'
import mapMetal from '../../assets/metal.jpg'
import mapWater from '../../assets/water.jpg'

class Dice extends Component {
  state = {
    activeRoll: ['d20'],
    color: 0xdbd444,
    texture: 'wood',
    bgColor: "white",
    spinSpeed: 0.01,
    spinX: 0.00,
    special: null,
    synthwave: false,
    rainbow: false,
    roll: 0,
    darkMode: false,
    settings: true,
    animate: true,
    flash: false,
    log: false,
    rollLog: [],
    rollQuality: '',
    designs: {
      d6: {
        mesh: false,
      }
    },
    multiRoll: false,
  };

  spinSpeed = 0.01;

  scene;
  camera;
  renderer;

  colorRandomizer = () => {
    let chars = "12345678abcdefABCDEF";
    let randomSet = [];
    for (let i = 0; i < 6; i++) {
      let n = Math.ceil(Math.random() * 20);
      randomSet.push(chars[n]);
    }
    let randomColor = randomSet.join("");
    console.log({ randomColor });
    this.setState({
      color: `0x${randomColor}`
    });
  }

  setSpeed = () => {
    this.setState({
      activeRoll: 'd6'
    })
    setTimeout(() => {
      this.setState({
        spinX: this.state.spinX + 0.1
      })
    }, 0);

    setTimeout(() => {
      this.setState({
        spinX: this.state.spinX + 0.1
      })
    }, 100);

    setTimeout(() => {
      this.setState({
        spinX: this.state.spinX - 0.1
      })
    }, 1000);

    setTimeout(() => {
      this.setState({
        spinX: this.state.spinX - 0.05
      })
    }, 1100);

    setTimeout(() => {
      this.setState({
        spinX: this.state.spinX - 0.05
      })
    }, 1100);
  }

  darkToggle = () => {
    let bgColor = this.state.bgColor === "black" ? "white" : "black";
    this.setState({ bgColor });
    let current = this.state.darkMode;
    this.setState({ darkMode: !current });
  }

  roll(die) {
    this.setState({ flash: false })
    let result = Math.ceil(Math.random() * die);
    let multi = this.state.multiRoll
    this.rollQuality(result, die);
    // this.logRoll(result, die)
    if (multi) {
      result += this.state.roll
    }
    this.logRoll(result, die, multi);
    this.setState({ roll: result });
    // Quick dirty animation
    setTimeout(() => {
      this.setState({ flash: true });
    }, 1)
  }

  logRoll(roll, die, multi) {
    let date = new Date().toLocaleTimeString()
    this.state.rollLog.unshift({ roll, die, date, multi });
  }

  rollQuality(roll, die) {
    let val = roll / die
    let quality;
    if (roll === 20 && die === 20) {
      quality = 'nat20'
    }
    if (roll === 1 ) {
      quality = 'horrible'
    } else if (val > 0.01 && val < 0.33) {
      quality = 'bad'
    } else if (val >= 0.33 && val < 0.66) {
      quality = 'medium'
    } else if (val >= 0.66 && val < 1.01){
      quality = 'good'
    } else {
      quality = 'godly'
    }

    this.setState({ rollQuality: quality })
  }

  componentDidMount() {
    this.cameraGen();
    this.pixar();
    
    document.addEventListener("keydown", this.shiftStart, false);
    document.addEventListener("keyup", this.shiftEnd, false);
  }

  shiftStart = (event) => {
    if (event.shiftKey) {
      this.setState({ multiRoll: true })
    }
  }

  shiftEnd = (event) => {
    if (event.key === 'Shift') {
      this.setState({ multiRoll: false })
    }
  }

  cameraGen() {
    this.camera = this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 14;
  }

  pixar() {
    let scene, renderer, material, line;
    let lineColor = this.state.color;

    // Init scene
    scene = new THREE.Scene();

    // Lighting
    var ambientLight = new THREE.AmbientLight(0xffffff);
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

    // Arrange die by ascending val
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
    trapez.merge(d10top.geometry, d10top.matrix);
    trapez.merge(d10bot.geometry, d10bot.matrix);
    trapez.translate(0, -4, 0);
    trapez2.merge(d100top.geometry, d100top.matrix);
    trapez2.merge(d100bot.geometry, d100bot.matrix);
    trapez2.translate(9, -4, 0);

    // Materials
    const loader = new THREE.TextureLoader();
    let wood = new THREE.MeshStandardMaterial({ map: loader.load(mapWood), name: 'wood'});
    let star = new THREE.MeshStandardMaterial({ map: loader.load(mapStar), name: 'star'});
    let metal = new THREE.MeshStandardMaterial({ map: loader.load(mapMetal), name: 'metal'});
    let water = new THREE.MeshStandardMaterial({ map: loader.load(mapWater), name: 'water'});
    let synthwave = new THREE.MeshNormalMaterial({ wireframe: false });
    let basic = new THREE.MeshStandardMaterial();
    let lambert = new THREE.MeshLambertMaterial({ flatShading: false, color: 'red', emissive: 'red', shininess: 30 });
    let tron = new THREE.MeshNormalMaterial({ wireframe: true, color:'blue' });
    const textureList = {
      wood, star, synthwave, basic, lambert, metal, tron, water
    }
    material = wood;

    // OUTLINES
    // let toon = new THREE.MeshToonMaterial()
    // let outlineMat = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.BackSide})
    // let d6Outline = new THREE.Mesh(cubeOutline, outlineMat)
    // d6Outline.scale.set(1.08, 1.08, 1.08);
    // d6Outline.translateX(10)
    // d6Outline.position = cube.position
    // scene.add(d6Outline);
    // let cubeOutline = new THREE.BoxGeometry(1, 0);
    // cubeOutline.translate(-6, -4, 0);
    // let outlines = [d6Outline]
    // outlines.forEach(outline => {
    //   center[outline] = new THREE.Vector3();
    //   outline.geometry.computeBoundingBox();
    //   outline.geometry.boundingBox.getCenter(center[outline]);
    //   outline.geometry.center();
    //   outline.position.copy(center[outline]);
    //   scene.add(outline);
    // });

    // Assign names for raycasting
    d100.name = "100";
    d20.name = "20";
    d12.name = "12";
    d10.name = "10";
    d8.name = "8";
    d6.name = "6";
    d4.name = "4";
    let dice = [d4, d6, d8, d10, d12, d20, d100];

    // Center around own axes and add to scene
    let center = {};
    dice.forEach(die => {
      center[die] = new THREE.Vector3();
      die.geometry.computeBoundingBox();
      die.geometry.boundingBox.getCenter(center[die]);
      die.geometry.center();
      die.position.copy(center[die]);
      scene.add(die);
    });

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let hue = 0;

    const animate = () => {
      // Turn off animations
      this.state.animate
        ? requestAnimationFrame(animate)
        : console.log("You're killing my battery, bro");

      renderer.setClearColor(this.state.bgColor);

      dice.forEach(die => {
        die.rotation.y += 0.007
      })

      line.rotation.x += 0.01;
      line.rotation.y += this.state.spinSpeed;
      if (hue < 360) {
        hue += 0.5;
      } else {
        hue = 0;
      }
      var color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
      line.material.color.set(color);

      if (this.state.special === 'synthwave') {
        dice.forEach(die => {
          die.material = synthwave;
        })
      } else if (this.state.special === 'rainbow') {
        dice.forEach(die => {
          die.material = textureList['basic'];
          die.material.color.set(color);
        })
      } else if (this.state.special === 'tron') {
        dice.forEach(die => {
          die.material = textureList['tron']
        })
      } else {
        dice.forEach(die => {
          die.material = textureList[this.state.texture]
          die.material.color.setHex(this.state.color);
        })
      }
      // d6.material.needsUpdate = true;
      renderer.render(scene, this.camera);
    };

    // Event Listener
    var mouse = new THREE.Vector2(0, 0);
    let raycaster = new THREE.Raycaster();
    renderer.setClearColor(this.state.bgColor);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = false;
    // let INTERSECTED;

    const onDocumentMouseDown = event => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // find intersections
      raycaster.setFromCamera(mouse, this.camera);
      var intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length && intersects[0].object.name) {
        this.roll(intersects[0].object.name);
      }
    };

    document.addEventListener("mousedown", onDocumentMouseDown, false);
    animate();
  }

  colorSet = (event) => {
    let color = event.target.value;
    color = color.replace("#", "0x");
    this.setState({ color });
  }

  changeSpecial = (event) => {
    let selection = event.substring(8)
    this.setState({
      special: selection
    })
  }

  batterySaver = () => {
    this.setState({
      animate: !this.state.animate,
    })
  }

  toggleSettings = () => {
    this.setState({
      settings: !this.state.settings,
    })
  }

  toggleLog = () => {
    this.setState({
      log: !this.state.log,
    })
  }

  changeMaterial = (e) => {
    let selection = e.substring(8)
    this.setState({
      special: null,
      texture: selection,
    });
  }

  render() {
    return (
      <div>
        {this.state.settings ? (
          <Header 
            colorRandomizer={this.colorRandomizer}
            colorSynth={this.colorSynth}
            colorSet={this.colorSet}
            darkToggle={this.darkToggle}
            batterySaver={this.batterySaver}
            setSpeed={this.setSpeed}
            colorRainbow={this.colorRainbow}
            toggleSettings={this.toggleSettings}
            toggleLog={this.toggleLog}
            changeMaterial={this.changeMaterial}
            changeSpecial={this.changeSpecial}
          />
        ) : (
          <div
          className='settings'
            onClick={() => this.setState({ settings: !this.state.settings })}
          >
            <i className={this.state.settings ? "open fas fa-cog" : "closed fas fa-cog"}></i>
          </div>
        )}
        {this.state.log &&
          <RollLog
          toggleLog={this.toggleLog}
          rolls={this.state.rollLog}
        />
        }
        <div class='roll-container d-flex justify-content-center text-align-center'>
          <div className={`roll`} >
          { this.state.roll === 0 ? 'Click a die to start' : 
          <div class='d-flex flex-column align-items-center'>You rolled a
            <div className={this.state.flash ? `flash ${this.state.rollQuality}` : ''}>{this.state.roll} </div>
          </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Dice;
