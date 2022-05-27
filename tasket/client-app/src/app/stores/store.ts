import { createContext, useContext } from "react";
import ArticleStore from "./articleStore";
import CommonStore from "./eommonStore";
import ModalStore from "./modalStore";
import TaskStore from "./taskStore";
import UserStore from "./userStore";

interface Store{
    articleStore: ArticleStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    taskStore:TaskStore;
}

export const store: Store={
    articleStore: new ArticleStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    taskStore: new TaskStore()
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}