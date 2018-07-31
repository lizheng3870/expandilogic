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
import bluemine from './res/images/bluemine.png';
import yellowmine from './res/images/yellowmine.png';
import redmine from './res/images/redmine.png';
import whitemine from './res/images/whitemine.png';

import MapBoard from './MapBoard'
import TextDiv from './TextDiv'

import Players from './Players'




class App extends Component {

  constructor() {
  super();


  var board = new MapBoard();
  var hexagons = board.createNewMap();


  this.state = {
    name: '',
    hexagons,
    path: { start: null, end: null },
    hidden: true,
    players:[]


  }





}

getRotaionHex(a){
  var hex =  new Hex(-a.s, -a.q, -a.r);
  hex.plant = a.plant;
  return hex;
}

onClick(event, source) {
  console.log(source.state.hex);
}

onClick2(event, source) {
  this.setState((prevState, props) => ({
  hidden: !prevState.hidden
}));
    console.log("current state "+ this.state.hidden);
}

onMouseEnter(event, source) {
  // Set the path's end on hover
  const { path, hexagons } = this.state;
  const targetHex = source.state.hex;
  path.end = targetHex;

  // Color some hexagons
  const coloredHexas = hexagons.map(hex => {
    hex.props = hex.props || {};
    // Highlight tiles that are next to the target (1 distance away)
    hex.props.className = (HexUtils.distance(targetHex, hex) < 3) ? 'active' : '';

    // If the tile is on same coordinate, add class specific to the coordinate name
    // hex.props.className += (targetHex.q === hex.q) ? ' q ' : '';
    // hex.props.className += (targetHex.r === hex.r) ? ' r ' : '';
    // hex.props.className += (targetHex.s === hex.s) ? ' s ' : '';

    return hex;
  });

  this.setState({ path, hexagons: coloredHexas });
}

  componentDidMount() {





    const itemsRef2 = firebase.database().ref('game/1/mapboard');
    itemsRef2.on('value', (snapshot) => {
      let value = snapshot.val();
      if(value !== null){

         let  hexagons = MapBoard.loadDataFromFirebase(value);
         console.log(hexagons);
         this.setState({
           hexagons: hexagons
         });

      }

    });


    const itemsRef3 = firebase.database().ref('game/1/players');
    itemsRef3.on('value', (snapshot) => {
      let value = snapshot.val();
      if(value !== null){
        console.log(value)

         //let  hexagons = MapBoard.loadDataFromFirebase(value);
         // console.log(hexagons);
         this.setState({
           players: value
         });

      }

    });


    // var compent = this
    //
    // var starCountRef = firebase.database().ref('test');
    // starCountRef.on('value', function(snapshot) {
    //   //alert(snapshot.val().test);
    //
    //   compent.setState((prevState, props) => ({
    //   hidden: false
    // }));
    // });
  }

  render() {
    const hexagonSize = { x: 3, y: 3 };

    let { hexagons, path } = this.state;


       return (

         <div className="App">

         <div className="title">
         <h2 >Gaia Project Map Demo{this.state.name}</h2>
         <Players players = {this.state.players}></Players>


         <div ><button className="hiddenLocation" type="button"  onClick={(e, h) => this.onClick2(e, h)} >Switch To Show Location Data</button></div>
         </div>
           <div className="map">



           <HexGrid width={1000} height={1400}>

             <Layout size={hexagonSize} flat={true} spacing={1} origin={{ x: 0, y: 0 }}>
               {
                 hexagons.map((hex, i) => (
                   <Hexagon
                     key={i}
                     q={hex.q}
                     r={hex.r}
                     s={hex.s}
                     fill={hex.planet}
                     className={hex.props ? hex.props.className : null}
                     onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
                     onClick={(e, h) => this.onClick(e, h)}
                   >

               <TextDiv hidden={this.state.hidden} hex={hex} ></TextDiv>

                   </Hexagon>
                 ))
               }
               <Path start={path.start} end={path.end} />
             </Layout>
             <Pattern id="yellow" link={yellow} size={hexagonSize} />
              <Pattern id="gaia" link={gaia} size={hexagonSize} />
              <Pattern id="white" link={white} size={hexagonSize} />
              <Pattern id="black" link={black} size={hexagonSize} />
              <Pattern id="blue" link={blue} size={hexagonSize} />
              <Pattern id="purple" link={purple} size={hexagonSize} />
               <Pattern id="red" link={red} size={hexagonSize} />
               <Pattern id="bluemine" link={bluemine} size={hexagonSize} />
               <Pattern id="redmine" link={redmine} size={hexagonSize} />
               <Pattern id="yellowmine" link={yellowmine} size={hexagonSize} />
               <Pattern id="whitemine" link={whitemine} size={hexagonSize} />

           </HexGrid>
           </div>


         </div>
       );





  }
}

export default App;
