import Sphere from './Sphere'
import { Multires } from './Multires'
import { Group, Mesh } from 'three'
import Controls from '../../systems/Controls'
import {LevelConfig, MultiResSource} from "../../Types";

export default class Pano{

    instance: Sphere|Multires

    constructor(){}

    sphere(source: string, controls: Controls){
        this.instance = new Sphere(source, controls)
        return this
    }

    multires(levelsConfig: LevelConfig, source: MultiResSource, controls: Controls){
        this.instance = new Multires(levelsConfig, source, controls)
        this.instance.createPano()
        this.instance.updatePosition()
        return this
    }

    get(): Mesh|Group {
        return this.instance.get()
    }

}
