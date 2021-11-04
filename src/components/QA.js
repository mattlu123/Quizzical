import React from 'react';
import './QA.css'
import Timer from './Timer';
import { useState } from 'react';
import {useTimer} from 'react-timer-hook';

function QA(props, {expiryTimestamp}){
    //0: answer page, 1: paused, 2: question page
    const [mainDisplay, setMainDisplay] = useState(1);
    const [question, setQuestion] = useState("");
    let userAnswer = "";
    const [correctAnswer, setCorrectAnswer]= useState("");
    const [correctLabel, setCorrectLabel] = useState("");
    const {
        seconds,
        pause,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    //changes the display
    function DisplayHeader(){

        if(seconds === 0){
            return(
                <div id="question-bar">
                    <button id="next-btn" onClick={function(){
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 20);
                        loadQuestion();
                        restart(time);
                        setMainDisplay(2);
                    }}>Next Question</button>
                    <label id="correct-answer">{correctAnswer}</label>
                </div>
            );
        }

        if(mainDisplay === 2){
            return(
                <div id="question-bar">
                    <button id="skip-btn" onClick={function(){
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 20);
                        loadQuestion();
                        restart(time);
                        setMainDisplay(2);
                    }}>Skip</button>
                    <button id="buzz-btn" onClick={function(){
                        pause();
                        setMainDisplay(1);
                    }}>Buzz</button>
                </div>
            );
        }else if(mainDisplay === 1){
            return (
                <div id="question-bar">
                    <input type='text' id='answer-input' placeholder='Enter Answer'/>
                    <button id="answer-btn" onClick={function(){
                        pause();
                        userAnswer = document.getElementById("answer-input").value;
                        answerCheck();
                        setMainDisplay(0);
                    }}>Submit</button>
                </div>
            );
        }else{
            return(
                <div id="question-bar">
                    <button id="next-btn" onClick={function(){
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 20);
                        restart(time);
                        loadQuestion();
                        setMainDisplay(2);
                    }}>Next Question</button>
                    <label id="correct-answer">{correctAnswer}</label>
                </div>
            );
        }
    }

    //changes the question display
    function DisplayQuestions(){
        if(mainDisplay === 2){
            return (
                <div id="question-container">
                    <p id="question">{question}</p>
                </div>
            );
        }else if(mainDisplay === 1){
            return (
                <div id="question-container">
                    <p id="question">{question}</p>
                </div>
            );
        }else{
            return (
                <div id="question-container">
                    <p id="question">{question}</p>
                    <label id="correct-label">{correctLabel}</label>
                </div>
            );
        }
    }

    //loads the next question
    function loadQuestion(){
        let data = {"difficulty": props.difficulty, "category": props.category}
        fetch("http://localhost:8080/fetchQ", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(function(data){
            //console.log(data.question.question.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'"));
            setQuestion(data.question.question.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'"));
            setCorrectAnswer(data.question.correct_answer);
        })
        .catch(err => console.error(err));
    }

    //levenshtein distance algorithm
    function minimumDist(str1, str2){
        let matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null)); 
        for (let i = 0; i <= str1.length; i += 1) {
            matrix[0][i] = i;
         }
         for (let j = 0; j <= str2.length; j += 1) {
            matrix[j][0] = j;
         }
         for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
               const replace = str1[i - 1] === str2[j - 1] ? 0 : 1;
               matrix[j][i] = Math.min(
                  matrix[j][i - 1] + 1,
                  matrix[j - 1][i] + 1,
                  matrix[j - 1][i - 1] + replace
               );
            }
         }
         return matrix[str2.length][str1.length];
    }

    //checks if user answer matches correct answer
    function answerCheck(){
        let u = userAnswer.toLowerCase();
        let c = correctAnswer.toLowerCase();
        let counter = Math.floor(Math.random() * 5000) + 1;;
        if((minimumDist(u, c) < 3 && correctAnswer.length > 4) || c.includes(u)){
            updatePoints();
            props.setPointTrigger(counter);
            setCorrectLabel("correct");
        }else if(userAnswer.toLowerCase() === correctAnswer.toLowerCase()){
            updatePoints();
            props.setPointTrigger(counter);
            setCorrectLabel("correct");
        }else{
            setCorrectLabel("incorrect");
        }
    }

    //updates the points
    function updatePoints(){
        const data = {'username': props.username}
        fetch("http://localhost:8080/updatePoints", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .catch(err => console.error(err));
    }

    return (
        <div id="qa-container">
            <DisplayHeader />
            <DisplayQuestions />
            <Timer time={seconds}/>
        </div>
    );
}

export default QA;