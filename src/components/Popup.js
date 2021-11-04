import React from 'react';
import './Popup.css'
import { useState } from 'react';
//import { Alert } from 'react-alert';

function Popup(props){

    const [display, setDisplay] = useState(0);

    function handleLogin(){
        //get username, password, email from form
        let username = document.getElementById("username-login").value;
        let password = document.getElementById("pword-login").value;
        const data = {'username': username, 'password': password}
        fetch("http://localhost:8080/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(function(data){
            //console.log("hello");
            console.log(data.success);
            if(data.success === true){
                props.setAuthenticated(1);
                props.setUsername(username);
            }else{
                props.setAuthenticated(0);
                alert("Invalid Input");
            }
        })
        .catch(err => console.error(err));
    }

    function handleSignup(){
        //get username, password, email from form
        let username = document.getElementById("username-signup").value;
        let password = document.getElementById("pword-signup").value;
        let email = document.getElementById("email-signup").value;
        const data = {'username': username, 'password': password, 'email': email}
        //do fetch request to backend (php, node, etc)
        fetch("http://localhost:8080/signup", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(function(data){
            console.log(data.success);
            if(data.success === true){
                props.setAuthenticated(1);
                props.setUsername(username);
            }else{
                props.setAuthenticated(0);
                alert("Invalid Input");
            }
        })
        .catch(err => console.error(err));
    }

    function LoginSignup(){
        //console.log(display);
        if(display === 0){
            return(
                <div id="login">
                    <label id='login-label'>Username</label><br></br>
                    <input type="text" id="username-login" placeholder='enter username'/><br></br>
                    <label id='login-label'>Password</label><br></br>
                    <input type="password" id="pword-login" placeholder='enter password'/><br></br>
                    <button id="login-btn" onClick={handleLogin}>Login</button><br></br>
                    <button id="change-to-signup" onClick={function(){setDisplay(1)}}>sign up</button>
                </div>
            )
        }
        return(
            <div id="signup">
                    <label>Username</label><br></br>
                    <input type="text" id="username-signup" placeholder='enter username'/>
                    <label>Password</label><br></br>
                    <input type="password" id="pword-signup" placeholder='enter password'/>
                    <label>Email</label><br></br>
                    <input type="email" id="email-signup" placeholder='enter email'/>
                    <button id="signup-btn" onClick={handleSignup}>Sign Up</button>
                    <button id="change-to-login" onClick={function(){setDisplay(0)}}>already have an account?</button>
                </div>
        )
    }

    return(
        <div className="popup-container">
            <div className="popup-content">
                <h1 id="ls-header">Login/Signup</h1>
                <LoginSignup />
            </div>
        </div>
    );
    
}

export default Popup