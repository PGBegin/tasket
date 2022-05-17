import React from "react";
import { Button } from "react-bootstrap";


export default function NotFound() {
    return (
        <>
        

            <div>
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div>
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div>
                    <Button  href = '/articles' variant="link">
                        Return to articles page   
                    </Button>
                </div>
            </div>
        </>
    )
}