import React, { Component } from "react";
import { AutoVideo } from './vis';
import { fact2vis } from "./vis/recommendation/fact2vis";

export default class ChartList extends Component {

    componentDidMount() {
        //const { id } = this.props.spec.chart;
        let spec = this.props.spec;
        //let container = id ? `#vischart_${id}` : "demo-chart";
        console.log("componentDidMount")
        let container = "demo-chart";
        // this.autovideo = new AutoVideo();
        // this.autovideo.container(container);
        // this.autovideo.load(spec);
        // this.specVis = this.autovideo.generate();
        // console.log("ChartList specVis")
        // console.log(this.specVis)
    }

    render() {
        console.log("in ChartList render")
        //画布的大小此处可修改
        let height = 640, width = 400;
        let vis;
        let spec = this.props.spec;
        let container = "demo-chart";
        this.autovideo = new AutoVideo();
        // this.autovideo.container(container);
        this.autovideo.load(spec);
        this.specVis = this.autovideo.generate();
        console.log("specVis render")
        console.log(this.specVis)
        //vis = fact2vis(this.specVis[0]);
        console.log("calliope-chart singleFinalSpecVis")
        console.log(this.specVis[0])
        const { id } = this.props.chart ? this.props.chart : { id: "demo-chartlist" };
        return (
            // <div id = {id ? `#vischart_${id}` : 'demo-chart'} style={{height: height, width: width, position: "relative"}} />
            <div id = 'demo-chartlist' style={{height: height, width: width, position: "relative"}} >
                <div id="single-chart">
                </div>
            </div>
        )
    }
}