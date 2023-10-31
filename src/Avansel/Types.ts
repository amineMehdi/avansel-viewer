
export declare interface CameraPosition {
    lat: number
    lng: number
    fov: number
}

export type AbortFunction = {
    abort: Function
}

export interface MultiResSource {
    url : Function | string,
    requestHeader? : Record<string, any>
}

export interface LevelConfig { // For Multires
    resolution: number,
    tileSize: number,
    maxLevel: number,
    fallback?: boolean
}