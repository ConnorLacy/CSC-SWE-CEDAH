import React from 'react';
import {Spinner} from 'react-bootstrap';

const Fetcher = () => {

    return (
        <>
            <div className="page logout">
                <div className="goodbye">
                    <h1>Sit tight!</h1>
                    <p>Getting your information ready.</p>
                    <Spinner animation="border" size="lg"/>
                </div>
            </div>
        </>
    )
}

export default Fetcher;