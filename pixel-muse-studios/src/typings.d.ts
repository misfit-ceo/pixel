declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager, Group } from 'three';

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (error: any) => void
    ): void;
    parse(
      data: any,
      path: string,
      onLoad: (gltf: GLTF) => void,
      onError: (error: any) => void
    ): void;
  }

  export interface GLTF {
    scene: Group;
    scenes: Group[];
    animations: any[];
    cameras: any[];
    asset: any;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    object: Camera;
    domElement: HTMLElement;
    enabled: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number; };
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE; };
    touches: { ONE: TOUCH; TWO: TOUCH; };

    update(): boolean;
    reset(): void;
  }
}
