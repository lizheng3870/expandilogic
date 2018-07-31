import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js';

import { GridGenerator, HexGrid, Layout, Path, Text, Hexagon, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './BoardMap.css';
import gaia from './res/images/gaia.png';
import white from './res/images/white.png';
import black from './res/images/black.png';
import blue from './res/images/blue.png';
import yellow from './res/images/yellow.png';
import purple from './res/images/purple.png';
import red from './res/images/red.png';

import MapBoard from './MapBoard'




class TextDiv extends Component {

  constructor() {
    super()

  }


  render() {

     if (this.props.hidden === true) {
       return (<div></div>);


     }else{
       return (<Text>{HexUtils.getID(this.props.hex)}</Text>);
     }



  }
}

export default TextDiv;
