import './App.css';
import Popup from './components/Popup';
import Sidenav from './components/Sidenav';
import Header from './components/Header';
import QA from './components/QA';
import Category from './components/Category';
import Difficulty from './components/Difficulty';
import { useState } from 'react';

function App() {

  const [authenticated, setAuthenticated] = useState(0);
  const [username, setUsername] = useState("");
  const [pointTrigger, setPointTrigger] = useState();
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");
  const time = new Date();
  time.setSeconds(time.getSeconds() + 20);
  
  if (authenticated === 1) {
    console.log("APP.JS", pointTrigger);
    return (
      <body>
        <Header username={username}/>
        <Sidenav pointTrigger={pointTrigger}/>
        <Category setCategory={setCategory}/>
        <Difficulty setDifficulty={setDifficulty}/>
        <QA 
          expiryTimestamp={time} 
          username={username}
          setPointTrigger={setPointTrigger}
          category={category}
          difficulty={difficulty}
        />
      </body>
    );
  }
  
  return (
    <body>
      <Popup 
        setAuthenticated={setAuthenticated}
        setUsername={setUsername}
      >
        <h1>Log in/Sign Up</h1>
      </Popup>
    </body>
  );
}

export default App;
