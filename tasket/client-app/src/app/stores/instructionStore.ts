import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Instruction } from "../models/instruction";

export default class InstructionStore {
    instructionRegistry = new Map<number, Instruction>();
    selectedInstruction: Instruction| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
    isLoadingFinished=false;

    constructor(){
        makeAutoObservable(this)
    }


    loadInstructions = async (id_article:number) => {
        this.loadingInitial = true;
        this.instructionRegistry.clear();
        this.setIsLoadingFinished(false);
        try {
            const instructions = await agent.Instructions.list(id_article);
            instructions.forEach(instruction => {
                this.setInstruction(instruction);
            })

            

            if (this.instructionRegistry.size > 0) {
                const ar1_map
                    = (Array.from(this.instructionRegistry.values()).filter((x: Instruction) => typeof x.display_order === 'number'))
                        .map((x: Instruction) => x.display_order);

                const id_startinst = (Array.from(this.instructionRegistry.values())).filter((x: Instruction) => x.display_order == Math.min.apply(null, ar1_map))[0].id_instruct;
                this.setSelectedInstruction(id_startinst);

            }

            this.setLoaingInitial(false);
            this.setIsLoadingFinished(true);
//            console.log('instruction loadig finished');
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }

    setSelectedInstruction = async (id_instruct:number) => {
        let instruction = this.getInstruction(id_instruct);
        if(instruction) {
            this.selectedInstruction = instruction;
            runInAction(()=>{
                this.selectedInstruction = instruction;
            })
            return instruction;
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

    loadInstruction = async (id_article:number,id_instruct:number) => {
        let instruction = this.getInstruction(id_instruct);
        if(instruction) {
            this.selectedInstruction = instruction;
            return instruction;
        } else {
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
        }
    }

    private setInstruction = (instruction : Instruction) => {
        this.instructionRegistry.set(instruction.id_instruct,instruction);
    }

    private getInstruction=(id_instruct:number) => {
        return this.instructionRegistry.get(id_instruct);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoadingFinished = (state: boolean) => {
        this.isLoadingFinished = state;
    }

}