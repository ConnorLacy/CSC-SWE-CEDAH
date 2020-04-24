import React from 'react'
import {Table} from 'react-bootstrap';

const Calendar = () => {

    let count = 0
    let time = 9
    let rows = []
    while(count<17){
        rows.push(<tr key={count-8}> 
            <td className="my-td">
                {
                    (time>12) ? time-12 : time
                }:{
                    (time%2===0) ? '00' : '30'
                }
            </td>
            <td className="my-td"></td>
            <td className="my-td"></td>
            <td className="my-td"></td>
            <td className="my-td"></td>
            <td className="my-td"></td>
            <td className="my-td"></td>
            <td className="my-td"></td>
        </tr>)
        count++
        time++
    }
    
    return (
        <Table 
            striped 
            bordered 
            hover 
            size="lg" 
            responsive
            >
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody className="calendar-body">
                {rows}
            </tbody>
        </Table>
    )
}

export default Calendar;