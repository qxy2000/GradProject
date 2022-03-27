import React, { Component } from "react";
import { AutoAnimation } from './vis';

const autoanimation = new AutoAnimation();

export default class Video extends Component {
    componentDidMount() {
        let id = "#demo-video";
        //autoanimation.container(id);
        autoanimation.play();
    }

    componentDidUpdate() {
        autoanimation.play();
    }

    render() {
        let height = 640, width = 640;
        console.log("in Video.render()")
        return (
            <div id="frame" style={{marginLeft: 60, marginTop: 40 , height: height+120, width: width}}>
                <div id='demo-video' style={{height: height, width: width}}></div>
            </div>
        )
    }
}