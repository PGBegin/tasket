import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Article } from "../models/article";

export default class ArticleStore {
    articleRegistry = new Map<number, Article>();
    selectedArticle: Article| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
    isLoadingFinished = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadArticles = async () => {
        this.loadingInitial = true;
        try {
            const articles = await agent.Articles.list();
            articles.forEach(article => {
                this.setArticle(article);
            })
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }

    loadArticle = async (id:number) => {
        let article = this.getArticle(id);
        if(article) {
            this.selectedArticle = article;
            this.setIsLoadingFinished(true);
            return article;
        } else {
            this.loadingInitial = true;
            this.setIsLoadingFinished(false);
            try {
                article = await agent.Articles.details(id);
                this.setArticle(article);
                runInAction(()=>{
                    this.selectedArticle = article;
                })
                this.setLoaingInitial(false);
                this.setIsLoadingFinished(true);
                //console.log('article loadig finished');
                return article;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }
    }

    private setArticle = (article : Article) => {
        this.articleRegistry.set(article.id_article,article);
    }

    private getArticle=(id:number) => {
        return this.articleRegistry.get(id);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoadingFinished = (state: boolean) => {
        this.isLoadingFinished = state;
    }

}