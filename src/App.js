
import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey=process.env.REACT_APP_APIKEY
  const [progress,setProgress]= useState(0);
    
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
        <Route exact path='/' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key="home" country="in" category="general" />} />
        <Route exact path='/business' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key='business' country="in" category="business" />} />
        <Route exact path='/entertainment' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key='entertainment' country="in" category="entertainment" />} />
        <Route exact path='/sports' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key='sports' country="in" category="sports" />} />
        <Route exact path='/health' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key='health' country="in" category="health" />} />
        <Route exact path='/science' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key='science' country="in" category="science" />} />
        <Route exact path='/technology' element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={12} key='technology' country="in" category="technology" />} />
        </Routes>
        </Router>
      </div>
    )
  }


export default App

