import { Canvas, useFrame, useThree, extend, ReactThreeFiber, Vector3 } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../../app/stores/store';
import { Instruction } from '../../../app/models/instruction';
import { View } from "../../../app/models/view";
//import * as THREE from 'three';
import * as THREE from "three";


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


export default observer( function TestScreen2() {

    const [p1, setP1] = useState(0);
    const [currentTarteg, setCurrentTarteg] = useState<THREE.Vector3>();
    const [t1, setT1] = useState<Instruction>();

    const [currentview, setCurrentview] = useState<View>();
    //const { scene } = useThree();
    //const controls = useRef();
  
    const setstate1=() => {
      setP1(p1+1);
      setCurrentTarteg(new THREE.Vector3(0,0,0));
      
      console.log("called");
    }
    
    const {instructionStore} = useStore();
    const { selectedInstruction} = instructionStore;

    
    useEffect(() => {
        //const orbitControls = (scene as any).orbitControls;
        //console.log('set article loading: ' + isArticleLoadingFinished );   
        //console.log('set instruction loading: ' + isInstructionLoadingFinished );     
        setT1(selectedInstruction);
        
    },[selectedInstruction])
    
    const {viewStore} = useStore();
    const { selectedView } = viewStore;

    
    useEffect(() => { 
        setCurrentview(selectedView);        
    },[selectedView])


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
            <OrbitControls target={[selectedView?.obt_target_x!, selectedView?.obt_target_y!, selectedView?.obt_target_z!]}  makeDefault  attach="orbitControls"/>
        }
        {
          //<UPDCam />
        }
        {
          <ChgView 
            cam_pos={new THREE.Vector3(selectedView?.cam_pos_x!, selectedView?.cam_pos_y!, selectedView?.cam_pos_z!)}
            target_pos={new THREE.Vector3(selectedView?.obt_target_x!, selectedView?.obt_target_y!, selectedView?.obt_target_z!)} 
            p1={p1}/>
        }

        <axesHelper args={[2]}/>
      </Canvas>
    </div>
    </>
  );
});


interface PropsCameraGoal {
    cam_pos : THREE.Vector3;
    target_pos: THREE.Vector3;
    p1:number;
  }
  
  const ChgView  = ({cam_pos, target_pos, p1}: PropsCameraGoal) => {
    let count=0;
    console.log("called2");
    useFrame((state) => {
      if(count<10){
        state.camera.position.x = cam_pos.x;
        state.camera.position.y = cam_pos.y;
        state.camera.position.z = cam_pos.z;
        
        state.camera.lookAt(target_pos.x,target_pos.y,target_pos.z);
        state.camera.updateProjectionMatrix();
        
        count++;
      }
    })
    return null
  }