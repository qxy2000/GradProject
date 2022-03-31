import * as d3 from 'd3';
import { transition } from 'd3';
//import horlinechart from '../svg/linechart5.svg'
import horlinechart from '../svg/horbarchart.svg'
// import verlinechart from '../svg/linechart6.svg'
import verlinechart from '../svg/verbarchart.svg'
import piechart from '../svg/piechart2.svg'
import bubblechart from '../svg/bubblechart.svg'

class Animation {
    constructor() {
        this.charts = [];
        this._container = document.createElement("div")
        this.chartlist = [];
        this.chartlist.push(horlinechart)
        this.chartlist.push(bubblechart)
        this.chartlist.push(verlinechart)
        this.chartlist.push(piechart)
    }

    chart2animation(){
        console.log("chart2animation")
        d3.select(this._container)
          .transition()
          .duration(2000)
          .style("opacity", 0)
          .transition()
          .style("opacity", 1);
    }

    addchart(i, container){
        console.log("add chart")
        //this._container = ".demo-chart"
        this._container = container
        //d3.xml("http://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg")
        // d3.xml("linechart2.svg")
        //   .then(data => {
        //       d3.select(this._container)
        //         .node()
        //         .append(data.documentElement)
        //   });

        if (i<this.chartlist.length) {
            d3.select(this._container)
                .selectAll("img")
                .attr("src", this.chartlist[i])
        }
        else {
            console.log("i > this.chartlist")
        }

        // d3.svg("linechart5.svg")
        //   .then(function(xml) {
        //       d3.select(".vis")
        //         .node()
        //         .appendChild(xml.documentElement);
        //   });
        // d3.select("#svgEmbed")
        //   .append("image")
        //   .attr("xlink:href","linechart5.svg")
          
    }
}

export default Animation;