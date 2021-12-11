import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { extendMaterial } from "./ExtendMaterial";

const WireframeExtendedMaterialPieces = extendMaterial(THREE.MeshStandardMaterial, {
  class: THREE.ShaderMaterial,
  uniforms: {
      mouseCoords: new THREE.Vector2(1000.0, 1000.0),
      viewportSize: new THREE.Vector2(0.0, 0.0),
  
      wireframeLensSize: 0.0,
      wireframeColorFront: new THREE.Color(1.0, 1.0, 1.0),
      wireframeColorBack: new THREE.Color(0.5, 0.5, 0.5),
      wireframeThickness: 3.0
  },
  
  header: `
      varying vec3 vBaryCentric;
      varying vec4 vPos;
  `,
  
  vertexHeader:`
      attribute vec3 baryCentric;
  `,

  fragmentHeader:`
      uniform vec2 mouseCoords; 
      uniform vec2 viewportSize;

      uniform vec3 wireframeColorFront;
      uniform vec3 wireframeColorBack;
      uniform float wireframeThickness;
      uniform float wireframeLensSize;

      float distSquared(vec2 a, vec2 b) {
          vec2 c = a-b;
          return dot(c,c);
      }
  
      vec2 clipToScreen(vec2 a, vec2 screenSize) {
        return (a * 0.5 + 0.5) * screenSize;
      }
  `,

  vertex:{
      '#include <fog_vertex>': `
          vBaryCentric = baryCentric;
          vPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          `
  },

  fragment:{
      'clipping_planes_fragment':{
          '#if NUM_CLIPPING_PLANES > 0' : /*glsl*/`?vec2 vCoords = clipToScreen(vPos.xy / vPos.w, viewportSize); //Getting position to clipspace (division) to screen space
          vec2 remapMouseCoords = clipToScreen(mouseCoords, viewportSize); //Getting mouse position from clip to screen space

          //Draw wireframe
          if (distSquared(vCoords, remapMouseCoords) < (wireframeLensSize * wireframeLensSize)){ // Checking distance squared factor
              //Draw wireframe in circle
              vec3 afwidth = fwidth( vBaryCentric );
              vec3 edge3 = smoothstep( ( wireframeThickness - 1.0 ) * afwidth, wireframeThickness * afwidth, vBaryCentric.xyz );
              float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );
              gl_FragColor.rgb = gl_FrontFacing ? wireframeColorFront : wireframeColorBack;
              gl_FragColor.a = edge; //Also influences depth test!
          }
          else{
              //Shade as normal
              
              #include <clipping_planes_fragment>
              vec4 diffuseColor = vec4( diffuse, opacity );
              ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
              vec3 totalEmissiveRadiance = emissive;
      `,

      '#include <dithering_fragment>': `}`
      } 

  },

  material: {
      side: THREE.DoubleSide,
      alphaToCoverage: true
  }
})

function createPieceMaterial(uniforms, vertexShader, fragmentShader) {

  const { size } = useThree();
  uniforms.size = size;

  useFrame(({mouse}) => {
    uniforms.mouseCoords = mouse;
  })

  return class extends THREE.ShaderMaterial {
    constructor() {
      const entries = Object.entries(uniforms); // Create uniforms and shaders
      super({
        uniforms,
        vertexShader,
        fragmentShader,
        lights: true,
        alphaToCoverage: true,
        side: THREE.DoubleSide
      });
      
      // Create getter/setters
      entries.forEach(([name]) => Object.defineProperty(this, name, {
        get: () => this.uniforms[name].value,
        set: v => this.uniforms[name].value = v
      }));

    }
  };
}

const PieceMaterial = createPieceMaterial(
  WireframeExtendedMaterialPieces.uniforms, 
  WireframeExtendedMaterialPieces.vertexShader, 
  WireframeExtendedMaterialPieces.fragmentShader
  )

extend({PieceMaterial})
