import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { history } from "../..";
import { Article } from "../models/article";
import { Attachmentfile } from "../models/attachmentfile";
import { Instruction } from "../models/instruction";
import { Modelfile } from "../models/ModelFile";
import { Task } from "../models/Task";
import { User, UserFormValues } from "../models/user";
import { View } from "../models/view";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }            
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}


const Tasks = {
    list: () => requests.get<Task[]>('/tasks/index'),
    details:(id:number) => requests.get<Task>(`/tasks/details/${id}`),
    create:(task: Task) => axios.post<void>(`/tasks/create`,task),
//    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id:number) => axios.delete<void>(`/tasks/details/${id}`),
}
const Modelfiles = {
    list: () => requests.get<Modelfile[]>('/modelfiles/index'),
    details:(id:number) => requests.get<Modelfile>(`/modelfiles/details/${id}`),
}

const Attachmentfiles = {
    list: () => requests.get<Attachmentfile[]>('/attachmentfiles/index'),
    details:(id:number) => requests.get<Attachmentfile>(`/attachmentfiles/${id}`),
}

const Articles = {
    list: () => requests.get<Article[]>('/articles/index'),
    details:(id:number) => requests.get<Article>(`/articles/details/${id}`),
}

const Instructions = {
    list: (id:number) => requests.get<Instruction[]>(`/instruction/index/${id}`),
    details:(id_article:number,id_instruct:number) => requests.get<Instruction>(`/instruction/id_article=${id_article}&id_article=${id_instruct}`),
}

const Views = {
    list: (id:number) => requests.get<View[]>(`/view/index/${id}`),
    details:(id:number) => requests.get<View>(`/view/details/${id}`),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Account,
    Modelfiles,
    Attachmentfiles,
    Articles,
    Instructions,
    Views,
    Tasks
}

export default agent;