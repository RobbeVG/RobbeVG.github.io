import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from 'three'

const MouseWireframeShaderMaterial = shaderMaterial(
  {
    mouseCoords: undefined,
    viewportSize: new THREE.Vector2(0.0, 0.0),

    wireframeLensSize: 0.0,
    wireframeColor: new THREE.Color(1.0, 1.0, 1.0),
    wireframeThickness: 3.0
  },
  /*glsl*/` //Vertex Shader
    attribute vec3 center;
    varying vec4 vPos;
    varying vec3 vCenter;

    void main() {
        vCenter = center;
        vPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position = vPos;
    }
  `, 
  /*glsl*/` //Fragment Shader
    varying vec4 vPos;
    varying vec3 vCenter;

    uniform vec2 mouseCoords; 
    uniform vec2 viewportSize;

    uniform vec3 wireframeColor;
    uniform float wireframeThickness;
    uniform float wireframeLensSize;

    float distSquared(vec2 a, vec2 b) {
        vec2 c = a-b;
        return dot(c,c);
    }
    
    void main() {
        vec2 vCoords = vPos.xy;
        vCoords /= vPos.w;
        vCoords = (vCoords * 0.5 + 0.5) * viewportSize; // Remaps it to [0,1]

        vec2 remapMouseCoords = (mouseCoords * 0.5 + 0.5) * viewportSize;

        //Draw wireframe
        if (distSquared(vCoords, remapMouseCoords) < (wireframeLensSize * wireframeLensSize)){

            vec3 afwidth = fwidth( vCenter.xyz );

            vec3 edge3 = smoothstep( ( wireframeThickness - 1.0 ) * afwidth, wireframeThickness * afwidth, vCenter.xyz );

            float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z ) ;

            gl_FragColor.rgb = gl_FrontFacing ? vec3( 0.9, 0.9, 1.0 ) : vec3( 0.4, 0.4, 0.5 );
            gl_FragColor.a = edge;
        }
        else{
            gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
        }
    }
  `
)

extend({ MouseWireframeShaderMaterial })
// if (distSquared(vCoords, uMouseCoords) >= 100.0){
//     gl_FragColor = vec4( 0, 0, 1, 1.0 );
// }