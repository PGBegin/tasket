import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { View } from "../models/view";

export default class ViewStore {
    viewRegistry = new Map<number, View>();
    selectedView: View| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
    isLoadingFinished=false;

    constructor(){
        makeAutoObservable(this)
    }


    loadViews = async (id_article:number) => {
        this.loadingInitial = true;
        this.viewRegistry.clear();
        this.setIsLoadingFinished(false);
        try {
            const views = await agent.Views.list(id_article);
            views.forEach(view => {
                this.setView(view);
            })
            this.setLoaingInitial(false);
            this.setIsLoadingFinished(true);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
            this.setIsLoadingFinished(false);
        }
    }

    setselectedView = async (id_view:number) => {
        let view = this.getView(id_view);
        if(view) {
            this.selectedView = view;
            runInAction(()=>{
                this.selectedView = view;
            })
            return view;
        } /*else {
            this.loadingInitial = true;
            try {
                instruction = await agent.Instructions.details(id_article,id_instruct);
                this.setInstruction(instruction);
                runInAction(()=>{
                    this.selectedInstruction = instruction;
                })
                this.setLoaingInitial(false);
                return instruction;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }*/
    }

    private setView = (view : View) => {
        this.viewRegistry.set(view.id_view,view);
    }

    private getView=(id_view:number) => {
        return this.viewRegistry.get(id_view);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoadingFinished = (state: boolean) => {
        this.isLoadingFinished = state;
    }

}