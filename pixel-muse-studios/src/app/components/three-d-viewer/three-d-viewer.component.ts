import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { Howl } from 'howler';

@Component({
  selector: 'app-three-d-viewer',
  standalone: true,
  templateUrl: './three-d-viewer.component.html',
  styleUrls: ['./three-d-viewer.component.scss']
})
export class ThreeDViewerComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) container!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  animationFrameId: number = 0;
  transitionSound!: Howl;
  isBrowser: boolean;
  private resizeListener: () => void;
  private currentModel: THREE.Group | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.resizeListener = this.onWindowResize.bind(this);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initScene();
      this.loadModel();
      this.animate();
      window.addEventListener('resize', this.resizeListener);

      // Initialize the sound effect (ensure the file exists at public/assets/sounds/transition.mp3)
      this.transitionSound = new Howl({
        src: ['assets/sounds/transition.mp3'],
        volume: 0.5
      });

      // Initialize OrbitControls for interactivity.
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
    }
  }

  initScene(): void {
    // Create the scene with a black background.
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    // Set up the camera.
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Set up the renderer.
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Add ambient light.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  loadModel(): void {
    const loader = new GLTFLoader();
    // Load the DamagedHelmet model from the public folder.
    loader.load(
      'models/DamagedHelmet/DamagedHelmet.gltf',
      (gltf: GLTF) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust the scale if necessary.
        this.currentModel = model;
        this.scene.add(model);

        // Animate the model's rotation using GSAP.
        gsap.to(model.rotation, { duration: 2, y: Math.PI * 2, repeat: -1, ease: 'linear' });
      },
      undefined,
      (error: any) => {
        console.error('An error occurred while loading the model:', error);
      }
    );
  }

  animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }

  triggerTransition(): void {
    if (this.transitionSound) {
      this.transitionSound.play();
    }
    // Animate the scene's background color as a transition effect.
    gsap.to(this.scene.background, { duration: 0.5, r: 0.1, g: 0.1, b: 0.1, yoyo: true, repeat: 1 });
  }

  onWindowResize(): void {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setModelScale(scale: number): void {
    if (this.currentModel) {
      this.currentModel.scale.set(scale, scale, scale);
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeListener);
  }
}
