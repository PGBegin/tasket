import { createContext, useContext } from "react";
import CommonStore from "./eommonStore";
import ModalStore from "./modalStore";
import TaskStore from "./taskStore";
import UserStore from "./userStore";
import StatusStore from "./statusStore";

interface Store{
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    taskStore:TaskStore;
    statusStore: StatusStore;
}

export const store: Store={
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    taskStore: new TaskStore(),
    statusStore: new StatusStore()
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}