import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";


import agent from "../../../app/api/agent";




export default observer( function TaskDetails() {

    const html_id_instruction = "instruction_description_zone";
    
    const {id} = useParams<{id:string}>();
    
    const {taskStore} = useStore();
    const {loadTask, selectedTask, isLoadingFinished} = taskStore;


    useEffect(()=> {

        if(id) {
            loadTask(Number(id));
        }

    }, [id])


    if(!isLoadingFinished) return (<><LoadingComponent /></>);   



    return (
        <>
            <h2>{selectedTask!.title}</h2>

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
                        </div>
                    </Col>
                    <Col>                        
                        <div id={html_id_instruction} className="overflow-auto" >
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