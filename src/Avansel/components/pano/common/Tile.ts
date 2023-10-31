
import {
	PlaneGeometry,
	Mesh,
	MeshBasicMaterial,
	DoubleSide,
	ImageLoader,
	Texture,
	Loader,
	Material,
	FileLoader, LoadingManager
} from 'three';
import { pano } from '../../../config.json'
import {AbortFunction, MultiResSource} from '../../../Types';
class TextureLoader extends Loader{

	constructor( manager?: any ) {
		super( manager );
	}

	load( url: string, requestHeader? : Record<string, any>, onLoad?: Function, onProgress?: (event: ProgressEvent<EventTarget>) => void | null, onError?: (event: ErrorEvent) => void | null ): Texture {
		const texture = new Texture() as Texture & AbortFunction;

		let loader = new ImageLoader( this.manager);
		// loader = loader.setCrossOrigin( this.crossOrigin ).setPath( this.path ).setWithCredentials(true).setRequestHeader(requestHeader);
		// loader.setPath( this.path );
		// loader.setRequestHeader(requestHeader)

		// let loader = new CustomImageLoader();
		var image = loader.load( url,function ( image ) {
			texture.image = image;
			texture.needsUpdate = true;
			if ( onLoad !== undefined ) {
				onLoad( texture );
			}
		}, onProgress, onError )

    texture.abort = () => {
        if(image && typeof image.hasAttribute === 'function'){
            image.src = '';
        }
    }

    return texture;
	}
}

class CustomImageLoader {

	requestHeader: Record<string, any> = {}

	load(url : string, requestHeader? : Record<string, any>, onLoad?: (image: HTMLImageElement) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void ): HTMLImageElement {
		const loader = new FileLoader()
		loader.setMimeType("image/jpeg" as any)
		loader.setRequestHeader(requestHeader)
		loader.setResponseType("blob")
		return loader.load(url, (response) => {
			const image = new Image()
			const blobUrl = URL.createObjectURL(response as any)
			image.src = blobUrl
			image.onload = () => onLoad(image)
			return image
		}, onProgress, onError)

	}
}

function createTile(name: string, side: string, level: number, data: any, source: MultiResSource) {
    const url = typeof source.url == 'function' ? source.url(side, level, data.x, data.y) : source.url
    const tileBaseSize = pano.tileBase + pano.maxLevels - level
    const half = tileBaseSize / 2
    const offsetX = data.width / 2 - half + data.offsetX
    const offsetY = half - data.height / 2 - data.offsetY
    const geometry = new PlaneGeometry(data.width, data.height)
    
    let material: Material
    material = new MeshBasicMaterial({ map: new TextureLoader().load(url, source.requestHeader), depthWrite: true, transparent: true, opacity: 1});
    material.side = DoubleSide
    const tile = new Mesh(geometry, material)
    tile.name = name
    tile.position.set(offsetX, offsetY, 0)
    return tile;
}

export { createTile };