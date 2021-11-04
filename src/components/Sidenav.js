import React from 'react';
import './Sidenav.css'
import { useState, useEffect } from 'react';

function Sidenav(props){

    const [tableElements, updateTableElements] = useState([]);

    useEffect(() => (

        fetch("http://localhost:8080/fetchTableData",{
            headers: { 'content-type': 'application/json'} 
        })
        .then(response => {
            return response.json()
        })
        .then(function(data){
            // create empty array here
            let arr = [];
            let sameIdx = 0;

            for(let i = 0; i < data.rows.length; i++){
                let username = data.rows[i].username;
                console.log(username);
                let points = data.rows[i].points;
                console.log(points);

                //append to temp array
                if(i !== 0 && data.rows[i].points === data.rows[i-1].points){
                    arr.push({"rank": i-sameIdx, "username": username, "points": points});
                    sameIdx++;
                }else{
                    arr.push({"rank": i+1, "username": username, "points": points});
                    sameIdx = 0;
                }
            }
            //debugger
            updateTableElements(arr);
        })
        .catch(err => console.error(err))
    ), [props.pointTrigger]);

    return(
        <div id="sidenav">
            <table id="table">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Points</th>
                    </tr>
                    {tableElements.map(function(tableElement){
                        //console.log(tableElements);
                        return(
                        <tr key={tableElement.username}>
                            <td>{tableElement.rank}</td>
                            <td>{tableElement.username}</td>
                            <td>{tableElement.points}</td>
                        </tr>
                    
                    )})}
                </tbody>
            </table>
        </div>
    );
}

export default Sidenav;