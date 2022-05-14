import {  makeAutoObservable, runInAction } from "mobx";
import { Scene, PerspectiveCamera, Color, WebGLRenderer } from "three";
import agent from "../api/agent";



export default class RendererStore {

    isScreenSetup=false;
    isScreenSetupLoadingFinished=false;
    camera_main = new PerspectiveCamera(45, 960 / 540, 1, 6350000);
    scene = new Scene();
    renderer: WebGLRenderer | undefined;

    constructor(){
        makeAutoObservable(this)
    }

    setIsScreenSetup = (state: boolean) => {
        this.isScreenSetup = state;
    }

    setIsScreenSetupLoadingFinished = (state: boolean) => {
        this.isScreenSetupLoadingFinished = state;
    }

    setUpRenderler = (elementname:string) => {
        console.log(elementname);
        this.renderer = new WebGLRenderer({
            canvas: document.querySelector(elementname)!, antialias: true, alpha: true 
        });

    }
}