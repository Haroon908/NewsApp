import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
 

const App =()=> {
  
  let apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0);
  
 
 
  
    return (

      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={progress}  />
          <Switch>
            <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={15} country='us' category='general' /></Route>
            <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={15} country='us' category='business' /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={15} country='us' category='entertainment' /></Route>
            <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={15} country='us' category='health' /></Route>
            <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={15} country='us' category='science' /></Route>
            <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={15} country='us' category='sports' /></Route>
            <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={15} country='us' category='technology' /></Route>
          </Switch>
        </Router>
      </div>

    )
  }


export default App