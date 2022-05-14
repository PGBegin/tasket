import { Canvas, useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BoxGeometry } from 'three/src/Three';
import { useStore } from '../../../app/stores/store';
extend({OrbitControls});

// インターフェイスIntrinsicElementsにorbitControls の定義を追加
declare global {
    namespace JSX {
      interface IntrinsicElements {
        orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
      }
    }
  }

const Orbit = () => {
  const {camera, gl} = useThree();
  
  return (
    <orbitControls args={[camera, gl.domElement]} />

  );
}

const Box = (
  props: JSX.IntrinsicElements["mesh"]) => {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame(state => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;


  })
  return (

    <mesh ref = {ref} {...props}>
    <boxBufferGeometry />    
      {
        //<meshBasicMaterial color='blue'/>

      }
      <meshPhysicalMaterial color="blue" />
    </mesh>
  );
};



const UPDCam = (props: JSX.IntrinsicElements["mesh"]) => {

  const {camera} = useThree();

  //const {instructionStore} = useStore();
  //const {selectedInstruction} = instructionStore;

  

  let count = 0;
  useFrame(state => {
    if(count<100){
      camera.position.z += 0.01;
      count+=1;
    }
  })

  //useEffect(() => {
    
    
  //},[selectedInstruction])


  return (null);
};


export default observer( function TestScreen() {

  return (
    <>
    <div style={{height:'50vh', width:'50vw'}} >
      <Canvas
        style={{background: 'black'}}
        camera={{position:[3,3,3]}} >
          <ambientLight intensity={0.5} />
        {
            <Box position={[1,1,0]}/>
        }
        {
          <Orbit />
        }
        {
          //<UPDCam />
        }

        <axesHelper args={[2]}/>
      </Canvas>
    </div>
    </>
  );
});