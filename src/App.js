import './App.css';
import ChartList from './ChartList';
import React, { Component } from "react";

function App() {
  return (
    <div className="App">
     <ChartList spec={require('./spec/CarSales.json')} /> 
     <div className="demo-chart">
       <img src={require("./svg/linechart.svg")} />
       <img src={require("./svg/logo192.png")} />
     </div>
   </div>
  );
}

export default App;
