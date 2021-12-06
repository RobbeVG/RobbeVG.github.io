import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from 'three'

const MouseWireframeShaderMaterial = shaderMaterial(
  {
    mouseCoords: undefined,
    viewportSize: new THREE.Vector2(0.0, 0.0),

    wireframeLensSize: 0.0,
    wireframeColorFront: new THREE.Color(1.0, 1.0, 1.0),
    wireframeColorBack: new THREE.Color(0.5, 0.5, 0.5),
    wireframeThickness: 3.0
  },
  /*glsl*/` //Vertex Shader
    attribute vec3 baryCentric;
    varying vec3 vBaryCentric;

    varying vec4 vPos;

    void main() {
        vBaryCentric = baryCentric;
        vPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position = vPos;
    }
  `, 
  /*glsl*/` //Fragment Shader
    //Shading properties


    varying vec4 vPos;
    uniform vec2 mouseCoords; //Coords of mouse in [-1,1] 
    uniform vec2 viewportSize; //Viewport size to map coordinates and to define pixel range (wireframeLensSize)

    //Wireframe properties
    varying vec3 vBaryCentric;

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
    
    void main() {
        vec2 vCoords = clipToScreen(vPos.xy / vPos.w, viewportSize); //Getting position to clipspace (division) to screen space
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
            gl_FragColor = vec4( vCoords, 0.0, 1.0 ); 
        }
    }
  `,
  (material) => {
    material.side = THREE.DoubleSide;
    material.alphaToCoverage = true;
  },

)

extend({ MouseWireframeShaderMaterial })
// if (distSquared(vCoords, uMouseCoords) >= 100.0){
//     gl_FragColor = vec4( 0, 0, 1, 1.0 );
// }