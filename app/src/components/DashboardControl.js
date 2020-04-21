import React from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const DashboardControl = (props) => {
    let type = props.tab.trim().toLowerCase()
    return (
        <>
        <div className="control-bar">
            <div 
                className="filters"
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '65%'
                }}>
                <h1 style={{margin: 'unset'}}>{props.tab}</h1>
            </div>
            <div 
                className="controls"
                style={{
                    display: 'flex',
                    width: '35%',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}>
                {(type === 'groups') ?
                    <>
                        <Button 
                            as={NavLink} 
                            to="/group/add"
                            variant="light">Create Group</Button>    
                        <Button 
                            as={NavLink} 
                            to="/group/join"
                            variant="light">Join Group</Button>
                    </>
                :
                    <Button 
                        as={NavLink} 
                        to="/group/add"
                        variant="light">Create Meeting</Button>    
                }
            </div>
        </div>
        <br/>
        </>
    )
}

export default DashboardControl;