import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { observer } from 'mobx-react-lite';
import { useStore } from "../../../app/stores/store";
import { Color, LinearEncoding, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from 'three';
import { setStarrySky } from './setStarlySky';


export default observer( function DebugDisplay() {

    const {articleStore} = useStore();
    const {selectedArticle, isLoadingFinished : isArticleLoadingFinished} = articleStore;
    
    const {instructionStore} = useStore();
    const {selectedInstruction,  isLoadingFinished : isInstructionLoadingFinished} = instructionStore;


    const {viewStore} = useStore();
    const {selectedView,  isLoadingFinished : isViewLoadingFinished} = viewStore;
    
    const {rendererStore} = useStore();
    const {isScreenSetup,  isScreenSetupLoadingFinished} = rendererStore;


    
    const bool2string = (state: boolean) => {
        return state ? "TRUE" : "FALSE"
    }
    


    return (
        <div>
            <div>article loaded : {bool2string(isArticleLoadingFinished)}</div>
            <div>instruction loaded : {bool2string(isInstructionLoadingFinished)}</div>
            <div>view loaded : {bool2string(isViewLoadingFinished)}</div>

            <div>isScreenSetup : {bool2string(isScreenSetup)}</div>
            <div>isScreenSetupLoadingFinished : {bool2string(isScreenSetupLoadingFinished)}</div>


            <div>article id : {selectedArticle?.id_article}</div>
            <div>instruction id : {selectedInstruction?.id_instruct}</div>
            <div>view id : {selectedView?.id_view}</div>


        </div>
    )
})