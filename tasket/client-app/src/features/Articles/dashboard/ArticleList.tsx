import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer( function ArticleList() {
    const {articleStore } = useStore();
     const {articleRegistry} = articleStore;

    return (
        <>
            { 
                Array.from(articleRegistry.values()).map(x=>(                    

                    <div key={x.id_article}>
                        <div>
                            <Link to={`/article/${x.id_article}`}>
                                {
                                    <img className="img-thumbnail mb-3" src={`https://localhost:5001/api/attachmentfiles/file/${x.id_attachment_for_eye_catch}`} alt="" width="480" height="270" loading="lazy"></img>
                                }
                                <h3 >{x.title}</h3>
                            </Link>
                            <p >{x.short_description}</p>
                        </div>
                    </div>
                

            )) }

        </>


    )
})