import Renderer from './systems/renderer'
import Loop from './systems/Loop'
import Controls from './systems/Controls'
import Resizer from './systems/Resizer'

import Camera from './Components/Camera'
import Scene from './Components/Scene'
import Pano from './Components/Pano/Pano'
import {LevelConfig, MultiResSource} from "./Types";

//import { createPreview } from './components/pano/preview';
//import { MultiResPano } from './components/pano/MultiResPano';

//import { createHotspot, createHotspotXYZ } from './components/hotspot/hotspot';
//import { PanoControls } from './systems/PanoControls.js';

class Avansel {

  loop: Loop
  controls: Controls
  renderer: Renderer
  resizer: Resizer

  container: Element
  canvas: HTMLCanvasElement
  camera: Camera
  scene: Scene

  pano: Pano
  
  tween: boolean

  constructor(container: Element) {
    this.container = container
    this.renderer = new Renderer(container)
    this.canvas = this.renderer.get().domElement
    this.camera = new Camera(container)
    this.resizer = new Resizer(container, this.camera, this.renderer)
  
    this.scene = new Scene()
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    this.controls = new Controls(this.camera, this.canvas)

    this.loop.updatable.push(this.controls)

    this.render()
  }

  sphere(source: string){
    this.pano = new Pano().sphere(source, this.controls)
    this.scene.add(this.pano.get())
    return this
  }

  multires(levelsConfig: LevelConfig, source: MultiResSource){
    this.pano = new Pano().multires(levelsConfig, source, this.controls)
    this.scene.add(this.pano.get())
    return this
  }

  withTween(tween: boolean){
    this.controls.setTween(tween)
    return this
  }

  render() {
    this.renderer.get().render(this.scene.get(), this.camera.get())
  }

  start() {
    this.loop.start()
    return this
  }
  
  stop() {
    this.loop.stop();
  }

}

export { Avansel }