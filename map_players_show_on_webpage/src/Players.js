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




class Players extends Component {

  constructor() {
    super()

  }


  render() {

     if (this.props.players.length === 0) {
       return (<div></div>);


     }else{
       return (
    <div className="Player">
               <table className="table">
         <thead>
           <tr>
             <th scope="col">#</th>
             <th scope="col" className="text-center" >name</th>
             <th scope="col" className="text-center" >Race</th>
             <th scope="col" className="text-center" >Color</th>
             <th scope="col" className="text-center" >Gold</th>
             <th scope="col" className="text-center" >Ore</th>
             <th scope="col" className="text-center" >Science</th>
             <th scope="col" className ="text-center" >QIC</th>
             <th scope="col" className="text-center" >Bowl1</th>
             <th scope="col" className="text-center" >Bowl2</th>
             <th scope="col" className ="text-center" >Bowl3</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <th scope="row">0</th>
             <td>{this.props.players[0].name}</td>
             <td>Terrans</td>
             <td>Blue</td>
             <td>{this.props.players[0].gold}</td>
             <td>{this.props.players[0].ore}</td>
             <td>{this.props.players[0].science}</td>
             <td>{this.props.players[0].qic}</td>
              <td>{this.props.players[0].bowl1}</td>
              <td>{this.props.players[0].bowl2}</td>
              <td>{this.props.players[0].bowl3}</td>
           </tr>
           <tr>
           <th scope="row">1</th>
           <td>{this.props.players[1].name}</td>
           <td>Xenos</td>
           <td>Yellow</td>
           <td>{this.props.players[1].gold}</td>
           <td>{this.props.players[1].ore}</td>
           <td>{this.props.players[1].science}</td>
           <td>{this.props.players[1].qic}</td>
           <td>{this.props.players[1].bowl1}</td>
           <td>{this.props.players[1].bowl2}</td>
           <td>{this.props.players[1].bowl3}</td>
           </tr>
           <tr>
           <th scope="row">2</th>
           <td>{this.props.players[2].name}</td>
           <td>HadschHallas</td>
           <td >Red</td>
           <td>{this.props.players[2].gold}</td>
           <td>{this.props.players[2].ore}</td>
           <td>{this.props.players[2].science}</td>
           <td>{this.props.players[2].qic}</td>
           <td>{this.props.players[2].bowl1}</td>
           <td>{this.props.players[2].bowl2}</td>
           <td>{this.props.players[2].bowl3}</td>
           </tr>
           <tr>
           <th scope="row">3</th>
           <td>{this.props.players[3].name}</td>
           <td>Nevlas</td>
           <td >White</td>
           <td>{this.props.players[3].gold}</td>
           <td>{this.props.players[3].ore}</td>
           <td>{this.props.players[3].science}</td>
           <td>{this.props.players[3].qic}</td>
           <td>{this.props.players[3].bowl1}</td>
           <td>{this.props.players[3].bowl2}</td>
           <td>{this.props.players[3].bowl3}</td>
           </tr>
         </tbody>
       </table>

                </div>);
     }



  }
}

export default Players;
