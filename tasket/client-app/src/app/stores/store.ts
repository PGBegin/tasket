import { createContext, useContext } from "react";
import ArticleStore from "./articleStore";
import AttachmentfileStore from "./attachmentfileStore";
import CommonStore from "./eommonStore";
import InstructionStore from "./instructionStore";
import ModalStore from "./modalStore";
import TaskStore from "./taskStore";
import UserStore from "./userStore";
import ViewStore from "./viewStore";

interface Store{
    articleStore: ArticleStore;
    instructionStore:InstructionStore;
    attachmentfileStore: AttachmentfileStore;
    viewStore:ViewStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    taskStore:TaskStore;
}

export const store: Store={
    articleStore: new ArticleStore(),
    instructionStore: new InstructionStore(),
    attachmentfileStore: new AttachmentfileStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    viewStore: new ViewStore(),
    taskStore: new TaskStore()
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}