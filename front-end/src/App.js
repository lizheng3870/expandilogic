import React, { Component } from 'react';
import Popup from "reactjs-popup";
import logo from './logo.svg';
import './App.css';
import Tabs from './Tabs';
//import Table from './Table';
import BootstrapTable from 'react-bootstrap-table-next';

//https://hackernoon.com/introducing-reactjs-popup-modals-tooltips-and-menus-all-in-one-227de37766fa

class App extends Component {
  render() {
    return (
      <div className="App">


    <div>
      <h1>Expandi Test Page</h1>

      <header className="App-header">
          
          <h1 className="App-title">Expandi Game Board</h1>
        </header>
      <Tabs>
        <div label="Scoreboard">
          [show scoreboard]

        </div>
        <div label="End Condition">
          End Condition & Round Bonus
        </div>
        <div label="Tech Tracks">
          [show tech tracks]
        </div>
        <div label="Special Actions">
          <h1>Select an Action</h1>
        <Popup trigger={<button className= "button">Build Mine</button>} position="bottom">
      {close => (
      
      <div>
        <p>Build a mine</p> 
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      
      <Popup trigger={<button className= "button">Gaia Form</button>} position="bottom">
      {close => (
      <div>
        Gaia forming
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      <Popup trigger={<button className= "button">Upgrade Building</button>} position="bottom">
      {close => (
      <div>
        Which track? [show tracks] 
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      <Popup trigger={<button className= "button">Federate</button>} position="bottom">
      {close => (
      <div>
        Federate 
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      <Popup trigger={<button className= "button">Research</button>} position="bottom">
      {close => (
      <div>
        Research (upgrade) ...
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      <Popup trigger={<button className= "button">Store</button>} position="bottom">
      {close => (
      <div>
        Buy From Store ...
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      <Popup trigger={<button className= "button">Special Actions</button>} position="bottom">
      {close => (
      <div>
        Special Actions ... 
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      <Popup trigger={<button className= "button">Pass</button>} position="bottom">
      {close => (
      <div>
        Are you sure you want to pass?
        <button> Yes </button>
        <button> No </button>
        <a className="close" onClick={close}>
        &times;
        </a>
      </div>
      )}
      </Popup>
      </div>
        
        <div label="History">
          [show history]
        </div>
        <div label="Chat">
          [show chat]
        </div>
      </Tabs>
    </div>

        </div>




    );
  }
}


export default App;
