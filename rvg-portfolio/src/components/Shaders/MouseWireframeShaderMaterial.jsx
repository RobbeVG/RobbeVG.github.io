import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from 'three'

const MouseWireframeShaderMaterial = shaderMaterial(
  {
    wireframeLensSize: 10.0,
    wireframeColorFront: new THREE.Color(1.0, 1.0, 1.0),
    wireframeColorBack: new THREE.Color(0.5, 0.5, 0.5),
    wireframeThickness: 1.5
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
    varying vec3 vBaryCentric;

    //Wireframe properties
    uniform vec3 wireframeColorFront;
    uniform vec3 wireframeColorBack;
    uniform float wireframeThickness;
    uniform float wireframeLensSize;
    
    void main() {
          //Draw wireframe in circle
          vec3 afwidth = fwidth( vBaryCentric );
          // vec3 edge3 = smoothstep(afwidth * ((wireframeThickness * 0.5) - 0.5), afwidth * ((wireframeThickness * 0.5) + 0.5), vBaryCentric);
          vec3 edge3 = smoothstep( ( wireframeThickness - 1.0 ) * afwidth, wireframeThickness * afwidth, vBaryCentric.xyz );
          float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );
          gl_FragColor.rgb = gl_FrontFacing ? wireframeColorFront : wireframeColorBack;
          gl_FragColor.a = edge; //Also influences depth test!
    }
  `,
  (material) => {
    material.side = THREE.DoubleSide;
    material.alphaToCoverage = true;
    material.extensions.derivatives = true;
  },

)

extend({ MouseWireframeShaderMaterial })

// export default MouseWireframeShaderMaterial