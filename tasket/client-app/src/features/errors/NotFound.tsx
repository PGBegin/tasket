import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";


export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name = 'search' />
                Oops error not founc
            </Header>
            <Segment.Inline>
                <Button as={Link} to = '/articles' primary>
                    Return to articles page   
                </Button>                
            </Segment.Inline>
        </Segment>
    )
}