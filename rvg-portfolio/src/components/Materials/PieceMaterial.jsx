import { useFrame, useThree } from '@react-three/fiber';
import Material from 'component-material'
import { useRef } from 'react';
import * as THREE from 'three'



function PieceMaterial({materialArgs}) {
    const refShader = useRef();

    useFrame(({mouse}) => {
        if (refShader.current === undefined)
            return;
        //Mouse is mapped from [-1,1] but gets remapped to (size) in shader!
        refShader.current.mouseCoords = new THREE.Vector2(mouse.x, mouse.y);
    })
    useThree(({size}) => {
        if (refShader.current === undefined)
            return;
        refShader.current.viewportSize = new THREE.Vector2(size.width, size.height);
    })

    return (
      <Material
        ref={refShader}
        from={THREE.MeshStandardMaterial}
        side={THREE.DoubleSide}
        alphaToCoverage={true}
        uniforms={{
            mouseCoords: { value: [0,0], type: 'vec2'},
            viewportSize: { value: [0,0], type: 'vec2' },
        
            wireframeColorFront: { value: [0.125, 0.984, 0.921], type: 'vec3' },
            wireframeColorBack: { value: [0.007, 0.611, 0.564], type: 'vec3' },
            wireframeThickness: { value: 1.0, type: 'float' },
            wireframeLensSize: { value: 100.0, type: 'float' }
        }}

        varyings={{
            vBaryCentric: { type: 'vec3' },
            vPos: { type: 'vec4' }
        }}

        {...materialArgs}
        >

        <Material.Vert.Head children={/*glsl*/`
            attribute vec3 baryCentric;
        `}/>
        
        <Material.Vert.Body children={/*glsl*/`
            vBaryCentric = baryCentric;
            vPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            //gl_Position = vPos;
        `}/>
        
        <Material.Frag.Head children={/*glsl*/`
            float distSquared(vec2 a, vec2 b) {
                vec2 c = a-b;
                return dot(c,c);
            }

            vec2 clipToScreen(vec2 a, vec2 screenSize) {
                return (a * 0.5 + 0.5) * screenSize;
            }
        `}/>

        <Material.Frag.clipping_planes_fragment children={/*glsl*/`
            vec2 vCoords = clipToScreen(vPos.xy / vPos.w, viewportSize); //Getting position to clipspace (division) to screen space
            vec2 remapMouseCoords = clipToScreen(mouseCoords, viewportSize); //Getting mouse position from clip to screen space

            //Draw wireframe
            if (distSquared(vCoords, remapMouseCoords) < (wireframeLensSize * wireframeLensSize)){ // Checking distance squared factor
                //Draw wireframe in circle
                vec3 afwidth = fwidth( vBaryCentric.xyz );
                vec3 edge3 = smoothstep( ( wireframeThickness - 1.0 ) * afwidth, wireframeThickness * afwidth, vBaryCentric.xyz );
                float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );
                gl_FragColor.rgb = gl_FrontFacing ? wireframeColorFront : wireframeColorBack;
                gl_FragColor.a = edge; //Also influences depth test!
            }
            else{
        `}/>

        <Material.Frag.dithering_fragment children={/*glsl*/`
            }
        `}/>
      </Material>
    )
  }

export default PieceMaterial;
