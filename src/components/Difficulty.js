import React from 'react';
import './Difficulty.css'

function Difficulty(props){

    return (
        <div id="difficulty">
            <label id="difficulty-label">Select Difficulty</label><br></br>
            <select name="dropdown" id="difficulty-dropdown" onChange={function(event){
                props.setDifficulty(event.target.value);
            }}>
                <option value="all">Select All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    );
}

export default Difficulty;