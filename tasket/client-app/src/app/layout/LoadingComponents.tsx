import { Spinner } from 'react-bootstrap';
//import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}


export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props){
    return(
        <div>
            <p>{content}</p>
            <Spinner animation="border" />
        </div>
        /*
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
        */
    )
}