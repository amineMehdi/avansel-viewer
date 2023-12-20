
import {Group, Material, MathUtils, Mesh, MeshBasicMaterial, PlaneGeometry, Texture} from 'three';
import { createTile } from './Tile';
import { pano } from '../../../config.json'
import {AbortFunction, MultiResSource} from '../../../Types';


export class Side {
    
    private tileCache: Map<string, Mesh<PlaneGeometry, Material>>

    constructor() {
        this.tileCache = new Map()
    }

    private sidePosition(side: string, level: number) {
        const tileBaseSize = pano.tileBase + pano.maxLevels - level
        const half = tileBaseSize / 2
        if(side == 'f') return [ 0, 0, half ]
        if(side == 'b') return [ 0, 0, -half ]
        if(side == 'l') return [ half, 0, 0 ]
        if(side == 'r') return [ -half,  0, 0 ]
        if(side == 'u') return [ 0, half, 0 ]
        if(side == 'd') return [ 0, -half, 0 ]
        return [0, 0, 0]
    }

    private sideRotation(side: string) {
        if(side =='f') return [0, MathUtils.degToRad(180), 0]
        if(side =='b') return [0, MathUtils.degToRad(0), 0]
        if(side =='l') return [0, MathUtils.degToRad(-90), 0]
        if(side =='r') return [0, MathUtils.degToRad(90), 0]
        if(side =='d') return [MathUtils.degToRad(90), MathUtils.degToRad(180), 0]
        if(side =='u') return [MathUtils.degToRad(-90), MathUtils.degToRad(180), 0]
        return [0, 0, 0]
    }

    private sideByLatLng(lat: number, lng: number) {
        if(lng > 45 && lng <= 135 && lat >= -45 && lat <= 45) return 'f'
        if(lng > 135 && lng <= 225 && lat >= -45 && lat <= 45) return 'r'
        if(lng > 225 && lng <= 315 && lat >= -45 && lat <= 45) return 'b'
        if(((lng > 315 && lng <= 360) || (lng >=0 && lng <= 45)) && lat >= -45 && lat <= 45) return 'l'
        if(lat > 45) return 'u'
        if(lat < -45) return 'd'
    }

    createSide(side: string, level: number, tiles: Array<any>, source: MultiResSource) {
        const group = new Group()
        const position = this.sidePosition(side, level)
        const rotation = this.sideRotation(side)
        group.position.set(position[0], position[1], position[2] );
        group.rotation.set(rotation[0], rotation[1], rotation[2] );
        group.renderOrder = level + 1
        group.name = level + '-' + side
        for(var i = 0; i < tiles.length; i++){
            const data = tiles[i]
            const name = level + '-' + side + '-' + data.x + '-' + data.y
            const tile = this.getTile(side, level, data, source)
            group.add(tile)
        }
        return group
    }
    updateSide(group: Group, side: string, level: number, tiles: Array<any>, source: MultiResSource, meshes: Array<string>) {
        for(var i = 0; i < tiles.length; i++){
            const data = tiles[i]
            const name = level + '-' + side + '-' + data.x + '-' + data.y
            if(!group.getObjectByName(name)){
                const tile = this.getTile(side, level, data, source)
                group.add(tile)
            }
        }
        for(var i = group.children.length - 1; i >= 0; i--){
            if(!meshes.includes(group.children[i].name)){
                const tile = group.children[i] as Mesh
                const material = tile.material as MeshBasicMaterial
                const texture  = material.map as Texture & AbortFunction
                texture.abort()
                tile.geometry.dispose()
                material.dispose()
                group.remove( tile );
            }
        }
    }
    deleteSide(group) {
        for(var i = group.children.length - 1; i >= 0; i--){
            const tile = group.children[i]
            tile.material.map.abort()
            tile.geometry.dispose()
            tile.material.dispose()
            group.remove( tile );
        }
    }

    private getTile(side: string, level: number, data: any, source: MultiResSource) {
        const name = (level + 1) + '-' + side + '-' + data.x + '-' + data.y
        if(this.tileCache[name]) {
            // console.log('getTile from cache', name)
            return this.tileCache[name]
        }
        // console.log('getTile', name)
        const tile = createTile(name, side, level, data, source)
        this.tileCache[name] = tile
        return tile
    }
}