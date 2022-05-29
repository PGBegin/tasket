import { createContext, useContext } from "react";
import CommonStore from "./eommonStore";
import ModalStore from "./modalStore";
import TaskStore from "./taskStore";
import UserStore from "./userStore";

interface Store{
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    taskStore:TaskStore;
}

export const store: Store={
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    taskStore: new TaskStore()
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}