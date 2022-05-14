import { createContext, useContext } from "react";
import ArticleStore from "./articleStore";
import AttachmentfileStore from "./attachmentfileStore";
import CommonStore from "./eommonStore";
import InstructionStore from "./instructionStore";
import ModalStore from "./modalStore";
import ModelfileStore from "./ModelfileStore";
import RendererStore from "./rendererStore";
import UserStore from "./userStore";
import ViewStore from "./viewStore";

interface Store{
    modelfileStore:ModelfileStore;
    articleStore: ArticleStore;
    instructionStore:InstructionStore;
    attachmentfileStore: AttachmentfileStore;
    viewStore:ViewStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    rendererStore:RendererStore;
}

export const store: Store={
    articleStore: new ArticleStore(),
    modelfileStore: new ModelfileStore(),
    instructionStore: new InstructionStore(),
    attachmentfileStore: new AttachmentfileStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    viewStore: new ViewStore(),
    rendererStore: new RendererStore()
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}