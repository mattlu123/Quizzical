import React from 'react';
import './Timer.css'

function Timer(props) {

    function convertTimeToPercent(){
        return props.time/20*100;
    }

    function Filler(){
        return (
            <div id="filler" style={{width: `${convertTimeToPercent()}%`}}/>
        )
    }

    return (
        <div id="timer">
            <label id="timer-label">Timer</label>
            <div id="shell">
                <Filler />
            </div>
            <span>{props.time}</span>
        </div>
    )
}


export default Timer;
