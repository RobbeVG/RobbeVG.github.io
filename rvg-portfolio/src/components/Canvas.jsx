import React from "react";
import * as THREE from "three";

export default class Canvas extends React.Component
{
    componentDidMount() { //Gets called when component is instantiated
        //Create scene camera renderer
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer({alpha: true}); //creating alpha buffer
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearAlpha(0.0); //Setting clear alpha
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.mount.appendChild( renderer.domElement );

        window.addEventListener('resize', this.updateDimensions); //resizing window
      
        //Add cube
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshStandardMaterial( { color: "rgb(255,0,0)"} );
        var cube = new THREE.Mesh( geometry, material );        
        scene.add( cube );        
        
        //Add light
        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );
        
        //Add helpers
        const gridHelper = new THREE.GridHelper(200, 50);
        scene.add(gridHelper)
        
        camera.position.z = 2;
        camera.position.y = 2;
        camera.lookAt(0,0,0)
        
        const clock = new THREE.Clock();

        //Animation loop (kinda like a game loop)
        var animate = function () {
            const deltaTime = clock.getDelta();

            requestAnimationFrame( animate );
            const speed = 1000;
            cube.rotation.x += 0.001 * deltaTime * speed;
            cube.rotation.y += 0.005 * deltaTime * speed;
            cube.rotation.z += 0.001 * deltaTime * speed;
            renderer.render( scene, camera );
        };
        animate();
    }

    componentWillUnmount() { //Gets called when unmounted
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    render() {
        return (
            <div className='fixed w-full h-full origin-top-left block' ref={ref => (this.mount = ref)} />
        )
    }
}