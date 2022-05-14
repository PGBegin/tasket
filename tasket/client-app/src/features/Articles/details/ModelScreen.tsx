import { useEffect, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { observer } from 'mobx-react-lite';
import { useStore } from "../../../app/stores/store";
import { BoxGeometry, Color, LinearEncoding, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, sRGBEncoding, Vector3, WebGLRenderer } from 'three';
import { setStarrySky } from './setStarlySky';


export default observer( function ModelScreen() {
    //const mountRef = useRef<HTMLDivElement>(null)

    
    const [descriptionAreaHeight, setDescriptionAreaHeight] = useState(document.documentElement.clientHeight);

    const {articleStore} = useStore();
    const {selectedArticle : article} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction,  setSelectedInstruction, instructionRegistry} = instructionStore;


    const {viewStore} = useStore();
    const {selectedView,  loadViews, setselectedView, viewRegistry} = viewStore;
    
    const {rendererStore} = useStore();
    const {isScreenSetup,  isScreenSetupLoadingFinished, setIsScreenSetup, camera_main, scene} = rendererStore;


    
    let width = 960;
    let height = 540;
    //let scene: Scene;
    //let camera_main:PerspectiveCamera;
    let renderer: WebGLRenderer;
    let controls: OrbitControls;
    

    const geometry = new BoxGeometry( 3, 3, 3 );
    const material = new MeshBasicMaterial( { color: 0xffff00 } );
    const mesh = new Mesh( geometry, material );

    // Setup Screen
    useEffect(()=> {

        if(isScreenSetup==false && isScreenSetupLoadingFinished) {

            //scene = new Scene();
            //camera_main = new PerspectiveCamera(45, width / height, 1, 6350000);
            scene.background = new Color(article?.bg_c);
    
    
            renderer = new WebGLRenderer({
                canvas: document.querySelector('#model_screen')!, antialias: true, alpha: true 
            });
            //setUpRenderler('#model_screen');

            scene.add( mesh );
    

            renderer?.setSize(width, height);
            renderer?.setClearColor(0xefefef);
            
            renderer?.setPixelRatio(window.devicePixelRatio);
    
    
            camera_main.position.x = 10;
            camera_main.position.y = 10;
            camera_main.position.z = 10;    

            
            controls = new OrbitControls(camera_main, renderer?.domElement);

            controls.target.x = 0;
            controls.target.y = 0;
            controls.target.z = 0;

            if(selectedView){
                camera_main.position.x = selectedView.cam_pos_x;
                camera_main.position.y = selectedView.cam_pos_y;
                camera_main.position.z = selectedView.cam_pos_z;
                
                controls.target.x = selectedView.obt_target_x;
                controls.target.y = selectedView.obt_target_y;
                controls.target.z = selectedView.obt_target_z;

                console.log(camera_main.position);
            }


            //Starry Sky Mode
            if (article?.isStarrySky) {
                setStarrySky(scene);
            }


            //Setting gammaOutput
            //In order to reduce darkening of some items with truee.js
            if (article?.gammaOutput) {
                renderer!.outputEncoding = sRGBEncoding;
            } else {
                renderer!.outputEncoding = LinearEncoding;
            }

            renderer?.render(scene,camera_main);

            setIsScreenSetup(true);            

            // orbit controls
            const orbitupdate = () => {

                controls.update();
                renderer?.render(scene, camera_main);
                requestAnimationFrame(orbitupdate);

            }
            orbitupdate(); 
            
            //this.camera_main.position.copy(this.camera_main_startpos);

            //this.controls.target.copy(this.controls_target_startpos);
        } else {}
        return () => {
            // clean up処理を記述する。
            //console.log('クリーンアップします。');
            //console.log(camera_main);
        };
    }, [isScreenSetup,isScreenSetupLoadingFinished])

    
    // Update View
    useEffect(()=> {
        selectedInstruction && setselectedView(selectedInstruction.id_view);

        if(isScreenSetup && isScreenSetupLoadingFinished && selectedInstruction) {

            let counter = 0;
            let pitch_pos = new Vector3(0,0,0,);
            let pitch_target = new Vector3(0,0,0,);
            const step=200;

            renderer = new WebGLRenderer({
                canvas: document.querySelector('#model_screen')!, antialias: true, alpha: true 
            });
            controls = new OrbitControls(camera_main, renderer?.domElement);

            //console.log(camera_main.position);
            //console.log(controls.target);
            //pitch_pos.set((selectedView?.cam_pos_x - this.camera_main.position.x) / this.step, (cam_pos.y - this.camera_main.position.y) / this.step, (cam_pos.z - this.camera_main.position.z) / this.step);


            //pitch_target.set((target.x - this.controls.target.x) / this.step, (target.y - this.controls.target.y) / this.step, (target.z - this.controls.target.z) / this.step);
            
            if(selectedView){
                pitch_pos.set((selectedView.cam_pos_x - camera_main.position.x) / step, (selectedView.cam_pos_y - camera_main.position.y) / step, (selectedView.cam_pos_z - camera_main.position.z) / step);
                pitch_target.set((selectedView.obt_target_x - controls.target.x) / step, (selectedView.obt_target_y - controls.target.y) / step, (selectedView.obt_target_z - controls.target.z) / step);

               console.log('camera_main.position');
               console.log(camera_main.position);
               console.log('pitch pos');
               console.log(pitch_pos);
               console.log('pitch pos');
               console.log(pitch_pos);

            }

            //視点変更(移動部分)
            const ScreenRenderTrans = () => {

                //DomUpdateView();
                if (counter >= step) { return; }

                counter += 1;

                //console.log(camera_main);

                camera_main.position.x += pitch_pos.x;
                camera_main.position.y += pitch_pos.y;
                camera_main.position.z += pitch_pos.z;


                controls.target.x += pitch_target.x;
                controls.target.y += pitch_target.y;
                controls.target.z += pitch_target.z;

                controls.update();
                renderer?.render(scene, camera_main);


                

                requestAnimationFrame(ScreenRenderTrans);
                return ;
            }

            ScreenRenderTrans();


            


            if(selectedView){
                camera_main.position.x = selectedView.cam_pos_x;
                camera_main.position.y = selectedView.cam_pos_y;
                camera_main.position.z = selectedView.cam_pos_z;
                
                controls.target.x = selectedView.obt_target_x;
                controls.target.y = selectedView.obt_target_y;
                controls.target.z = selectedView.obt_target_z;
                controls.update();
                renderer.render(scene, camera_main);

                console.log(camera_main.position);
            }
            //console.log(scene);
     
            
        } 
        return () => {
            // write clean up procedure if need
        };
    }, [selectedView])

    
    return (
        <>
        <div />
        {
        //console.log("called")
        }
        </>
    )
})