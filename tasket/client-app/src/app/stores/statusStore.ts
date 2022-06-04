import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Status } from "../models/Status";

export default class StatusStore {
    statusRegistry = new Map<number, Status>();
    selectedStatus: Status| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
    isLoadingFinished = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadStatuses = async () => {
        this.loadingInitial = true;
        this.isLoadingFinished = false;
        try {
            const statuses = await agent.Statuses.list();
            statuses.forEach(status => {
                this.setStatus(status);
            })
            this.setLoaingInitial(false);
            this.setIsLoadingFinished(true);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }

    loadStatus = async (id:number) => {
        let status = this.getStatus(id);
        if(status) {
            this.selectedStatus = status;
            this.setIsLoadingFinished(true);
            return status;
        } else {
            this.loadingInitial = true;
            this.setIsLoadingFinished(false);
            try {
                status = await agent.Statuses.details(id);
                this.setStatus(status);
                runInAction(()=>{
                    this.selectedStatus = status;
                })
                this.setLoaingInitial(false);
                this.setIsLoadingFinished(true);
                return status;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }
    }

    
    createStatus = async (status: Status) => {
        this.loading = true;
        try {
            await agent.Statuses.create(status);
            runInAction(() => {
                this.statusRegistry.set(status.status, status);
                this.selectedStatus = status;
                this.editMode=false;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    updateStatus = async (status: Status) => {
        this.loading = true;
        
        try {
            await agent.Statuses.update(status);
            runInAction(() => {
                this.statusRegistry.set(status.status, status);
                this.selectedStatus = status;
                this.editMode=false;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteStatus = async (Id: number) => {
        this.loading = true;
        
        try {
            await agent.Statuses.delete(Id);
            runInAction(() => {
                this.statusRegistry.delete(Id);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setStatus = (status : Status) => {
        this.statusRegistry.set(status.status, status);
    }

    private getStatus=(id:number) => {
        return this.statusRegistry.get(id);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoadingFinished = (state: boolean) => {
        this.isLoadingFinished = state;
    }

}