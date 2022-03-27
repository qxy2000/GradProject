import './App.css';
import ChartList from './ChartList';
import React, { Component } from "react";
import horlinechart from './svg/linechart5.svg'
import verlinechart from './svg/linechart6.svg'
import piechart from './svg/piechart2.svg'
import logo from './logo.svg'
import Video  from './Video';

function App() {
  return (
    <div className="App">
     <div className="demo-chart">
       {/* <p>hello</p> */}
       {/* <img></img> */}
       <img src={horlinechart} />
       {/* <img src={verlinechart} />
       <img src={piechart} /> */}
       {/* <svg width="100" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
         <rect width="100%" height="100%" style="fill:blue;stroke-width:2;stroke:rgb(0,0,0)"/>
       </svg> */}
     </div>
     <div className="new-chart" >
       <img></img>
       {/* <img src={horlinechart} /> */}
     </div>
     {/* <div className="dissolve-chart"> */}
       {/* <img src={piechart} /> */}
       {/* <img></img> */}
     {/* </div> */}
     <ChartList spec={require('./spec/CarSales.json')} /> 
     <Video></Video>
     <div className='vis'></div>
     <svg id='svgEmbed'></svg>
   </div>
  );
}

export default App;
