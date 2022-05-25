import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Task } from "../models/Task";

export default class TaskStore {
    taskRegistry = new Map<number, Task>();
    selectedTask: Task| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
    isLoadingFinished = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadTasks = async () => {
        this.loadingInitial = true;
        try {
            const tasks = await agent.Tasks.list();
            tasks.forEach(task => {
                this.setTask(task);
            })
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }

    loadTask = async (id:number) => {
        let task = this.getTask(id);
        if(task) {
            this.selectedTask = task;
            this.setIsLoadingFinished(true);
            return task;
        } else {
            this.loadingInitial = true;
            this.setIsLoadingFinished(false);
            try {
                task = await agent.Tasks.details(id);
                this.setTask(task);
                runInAction(()=>{
                    this.selectedTask = task;
                })
                this.setLoaingInitial(false);
                this.setIsLoadingFinished(true);
                //console.log('article loadig finished');
                return task;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }
    }

    private setTask = (task : Task) => {
        this.taskRegistry.set(task.Id,task);
    }

    private getTask=(id:number) => {
        return this.taskRegistry.get(id);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoadingFinished = (state: boolean) => {
        this.isLoadingFinished = state;
    }

}