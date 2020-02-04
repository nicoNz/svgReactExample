import React from 'react';
import logo from './logo.svg';
import {Row} from 'reactstrap'

import MySvg from './components/SVG/MySvg'
import MyUi from './components/UI/MyUi'

import './App.css';

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400

function createRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color)
  return color;
}

function createRandomCircle() {
  const id = Math.random().toString()
  return {
    [id] : {
      id,
      color : createRandomColor(),
      position : {
        x : Math.random()*20+10, 
        y : Math.random()*20+10
      },
      data : {
        things : Math.random()*10,
        otherThings : (Math.random()*10).toString
      }
    }
  }
}

const INITIAL_STATE = {
  drag : null,
  /*
    can be 
    drag : {
      targetId : 1,
      originalMousePosition : {
        x : 4, 
        y : 6
      },
      originalTargetPosition : {
        x : 2, 
        y : 3
      }
    }
  */
  circles : {
    ...createRandomCircle(),
    ...createRandomCircle(),
    ...createRandomCircle()
  }
}

function App() {
  const [appState, setAppState] = React.useState(INITIAL_STATE)
  return (
    <div className="App">
        <div>
          <MySvg 
            setAppState={setAppState}
            appState={appState}
          />
        </div>
        <div>
          <MyUi 
            appState={appState}
          />
        </div>
    
    </div>
  );
}

export default App;
