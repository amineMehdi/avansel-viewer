
export declare interface CameraPosition {
    lat: number
    lng: number
    fov: number
}

export type AbortFunction = {
    abort: Function
}

export interface Source {
    url : Function | string,
    requestHeader? : Record<string, any>
}