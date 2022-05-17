import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";


import agent from "../../../app/api/agent";
import { Article } from "../../../app/models/article";
import { Instruction } from "../../../app/models/instruction";




export default observer( function ArticleDetails() {

    const html_id_instruction = "instruction_description_zone";
    
    const {id} = useParams<{id:string}>();
    const [descriptionAreaHeight, setDescriptionAreaHeight] = useState(document.documentElement.clientHeight);

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, isLoadingFinished : isArticleLoadingFinished} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, setSelectedInstruction, instructionRegistry, isLoadingFinished : isInstructionLoadingFinished} = instructionStore;


    const {viewStore} = useStore();
    const {selectedView,  loadViews, setselectedView, viewRegistry, isLoadingFinished : isViewLoadingFinished} = viewStore;
    
    
    function handleResize() {
        const size = document.documentElement.clientHeight - document.getElementById(html_id_instruction)!.getBoundingClientRect().top;
        setDescriptionAreaHeight(size);
    }

    useEffect(() => {
    
        window.addEventListener('resize', handleResize)
    
        return () => {
          window.removeEventListener('resize', handleResize)
        }
    })


    useEffect(()=> {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        //console.log('selected instruction change: to ' + selectedInstruction?.id_instruct);
    }, [selectedInstruction])
    

    useEffect(()=> {

        if(id) {
            //console.log('id change: to ' + id);
            loadArticle(Number(id));
            loadInstructions(Number(id));
            loadViews(Number(id));
        }

    }, [id])


    if(!false) return (<><LoadingComponent /></>);
    

    const handleInputChangeInstruction=(id_instruct: number) => {
        handleResize();
        setSelectedInstruction(id_instruct);
    }




    return (
        <>
            <h2>{article!.title}</h2>

            <Container>
                <Row>
                    <Col>
                    {
                        /*
                        <>
                        <div id="annotations">
                        </div>
                        <canvas id="model_screen">

                        </canvas>
                        </>
                        */
                    }
                        <div id="control_panel_zone">
                            {
                                Array.from(instructionRegistry.values()).map(x=>(
                                    <>
                                    <button  key={x.id_instruct}
                                        type = 'submit'
                                        className={x.id_instruct==selectedInstruction?.id_instruct ? "btn btn-primary" : "btn btn-outline-primary"}
                                        onClick={()=>{handleInputChangeInstruction(x.id_instruct)}} >{x.title}</button>
                                    </>
                                ))
                            }
                            <p>{descriptionAreaHeight}</p>
                        </div>
                    </Col>
                    <Col>                        
                        <div id={html_id_instruction} className="overflow-auto" style={{'height':`${descriptionAreaHeight}px`}}>
                            {
                                //selectedInstruction && <PanelInstruction instruction={selectedInstruction} />
                            }
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </>


    )
})







// export function ArticleDetails() {
//     const {id} = useParams<{id:string}>();

//     const [loading, setLoading] = useState(true);

//     const [article, setArticle] = useState<Article>();
//     const [instructions, setInstructions] = useState<Instruction[]>();
//     const [selectedId_instruct, setSelectedId_instruct] = useState(0);
//     const [selectedInstruction, setSelectedInstruction] = useState<Instruction>();

//     useEffect(() => {

//         const loading = async() => {
//             const response = await agent.Instructions.list(Number(id));
//             setInstructions(response);

//             const response2 = await agent.Articles.details(Number(id));
//             setArticle(response2);
            
//             setLoading(false);
            
//           }
//           loading()


//     },[])

//     const handleInputChangeInstruction=(id_instruct: number) => {

//         setSelectedId_instruct(id_instruct);
//         const x = instructions!.findIndex(x=>x.id_instruct==id_instruct);
//         setSelectedInstruction(instructions![x]);

//     }

//     if(!article) return <LoadingComponent />;

//     return (
//         <>
//             <h2>{article!.title}</h2>

//             <div>
//                 <div>
//                     <div id="annotations">
//                     </div>
//                     <canvas id="model_screen">
//                     </canvas>
//                     <div id="control_panel_zone">
//                         {
//                             instructions && instructions.map(x=>(
//                                 <div key={x.id_instruct} >
//                                     <Button 
//                                         type = 'submit'
//                                         variant={x.id_instruct==1 ? "primary" : "outline-primary"}
//                                         onClick={()=>{handleInputChangeInstruction(x.id_instruct)}} 
//                                     >
//                                         {x.title}
//                                     </Button>                  
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 </div>
//                 <div>
//                     {
//                         selectedInstruction && <PanelInstruction instruction={selectedInstruction} />
//                     }
//                 </div>
//             </div>
//         </>


//     )
// }