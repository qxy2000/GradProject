import {Fade} from './transitions';
import { Wipe } from './transitions';
import { Dissolve } from './transitions';
import {Animation} from '../vis'

class AutoAnimation {
    constructor() {
        if (!AutoAnimation.instance) {
            this._container = document.createElement("div");
            this._timeouts = [];
            this._animation = new Animation();
            AutoAnimation.instance = this;
        }
        else {
            return AutoAnimation.instance;
        }
    }

    container(value) {
        if (!value) {
            return this._container;
        }
        this._container = value;
    }

    play() {
        let animationDelay = 0;
        let pauseDuration = 3500;
        let transitionDuration = 3000;
        // let fade = new Fade();
        this._container = ".demo-chart"
        // fade.container(this.container());
        // fade.duration(transitionDuration);
        // let wipe = new Wipe();
        // wipe.container(this.container());
        // wipe.duration(transitionDuration);
        let chartnum = 3
        console.log("start autoanimation.play")
        for (let i=0; i<chartnum; i++){
            animationDelay =  this.fadeTransition(i, animationDelay, pauseDuration, transitionDuration);
            //animationDelay = this.wipeTransition(i, animationDelay, pauseDuration, transitionDuration);
            //animationDelay = this.dissolveTransition(i, animationDelay, pauseDuration, transitionDuration);

            // this._timeouts.push(setTimeout(function() {
            //     this._animation.addchart(i)
            // }.bind(this), animationDelay));
            // animationDelay = animationDelay + 2000;

            // //pause
            // animationDelay = animationDelay + pauseDuration;

            // console.log("animationDelay")
            // console.log(animationDelay)

            //transition
            //fade
            // this._timeouts.push(setTimeout(function () {
            //     fade.animateTransition();
            // }, animationDelay));
            //wipe
            // this._timeouts.push(setTimeout(function () {
            //     wipe.animateTransition();
            // }, animationDelay));
            // animationDelay = animationDelay + transitionDuration;
            // console.log("finish autoanimation.play")
        }
    }

    fadeTransition(chartIndex, animationDelay, pauseDuration, transitionDuration) {
        let fade = new Fade();
        fade.container(this.container());
        fade.duration(transitionDuration)

        this._timeouts.push(setTimeout(function(){
            fade.animateTransition();
        }, animationDelay));
        animationDelay = animationDelay + transitionDuration;

        this._timeouts.push(setTimeout(function() {
            this._animation.addchart(chartIndex, this._container)
        }.bind(this), animationDelay));
        
        //add chart duration
        animationDelay = animationDelay + 2000;

        //pause
        animationDelay = animationDelay + pauseDuration;
        console.log("animationDelay")
        console.log(animationDelay)
        console.log("finish fadetransition")
        return animationDelay;
    }

    wipeTransition(chartIndex, animationDelay, pauseDuration, transitionDuration) {
        let wipe = new Wipe();
        wipe.container(this.container());
        wipe.duration(transitionDuration)
        //debug
        //chartIndex = chartIndex + 1
        let originContainer = this._container;
        let newContainer; 
        if (originContainer == ".demo-chart") {
            newContainer = ".new-chart"
        }
        else {
            newContainer = ".demo-chart"
        }
        //let newcontainer = ".new-chart"
        this._timeouts.push(setTimeout(function() {
            //wipe需要一个新的<img>来显示vis，原<img>左移，新<img>同时右移
            this._animation.addchart(chartIndex, newContainer)
        }.bind(this), animationDelay));
        //add chart duration
        //animationDelay = animationDelay + 2000;

        //pause
        //animationDelay = animationDelay + pauseDuration;

        let handle;
        this._timeouts.push(setTimeout(function(){
            handle = "move"
            wipe.animateTransition(handle,originContainer);
        }.bind(this), animationDelay));
        
        this._timeouts.push(setTimeout(function(){
            handle = "add"
            wipe.animateTransition(handle,newContainer);
        }.bind(this), animationDelay));
        animationDelay = animationDelay + transitionDuration;
        //add chart duration
        animationDelay = animationDelay + 2000;
        //pause
        animationDelay = animationDelay + pauseDuration;
        //将this._container更新为newContainer
        this._container = newContainer;
        console.log("finish fadetransition")
        return animationDelay;
    }

    dissolveTransition(chartIndex, animationDelay, pauseDuration, transitionDuration) {
        let dissolve = new Dissolve();
        dissolve.container(this.container());
        dissolve.duration(transitionDuration)
        let originContainer = this._container;
        let newContainer; 
        if (originContainer == ".demo-chart") {
            newContainer = ".new-chart"
        }
        else {
            newContainer = ".demo-chart"
        }
        this._timeouts.push(setTimeout(function() {
            this._animation.addchart(chartIndex, newContainer)
        }.bind(this), animationDelay));

        let dissolvehandle;
        this._timeouts.push(setTimeout(function(){
            dissolvehandle = "dissolveOut"
            dissolve.animateTransition(dissolvehandle, originContainer);
        }, animationDelay));
        this._timeouts.push(setTimeout(function(){
            dissolvehandle = "dissolveIn"
            dissolve.animateTransition(dissolvehandle, newContainer);
        }, animationDelay));
        animationDelay = animationDelay + transitionDuration;

        //add chart duration
        animationDelay = animationDelay + 2000;

        //pause
        animationDelay = animationDelay + pauseDuration;
        console.log("animationDelay")

        this._container = newContainer;

        console.log(animationDelay)
        console.log("finish fadetransition")

        return animationDelay;
    }

}

export default AutoAnimation;