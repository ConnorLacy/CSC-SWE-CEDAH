import React from 'react'
import { DropdownButton, FormControl, InputGroup, Button} from 'react-bootstrap'


const CustomDropdown = (props) => {
    return (
        <DropdownButton
            alignRight
            title={props.title}
            id="dropdown-menu-align-right"
            >
            <h4 style={{textAlign: 'center', padding: 10}}>{props.message}</h4>
            <InputGroup className="mb-3" style={{padding: 10}}>
                <FormControl
                placeholder={props.placeholder}
                aria-label={props.placeholder}
                />
                <InputGroup.Append>
                    <Button variant="primary">{
                    props.join ? 'Join' : 'Add'}</Button>
                </InputGroup.Append>
            </InputGroup>
        </DropdownButton>
    )
}
export default CustomDropdown;