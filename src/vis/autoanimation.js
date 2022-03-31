import {Fade} from './transitions';
import { Wipe } from './transitions';
import { Dissolve } from './transitions';
import { Zoom } from './transitions';
import {Animation} from '../vis'
import TransType from './visualization/transtype';

class AutoAnimation {
    constructor() {
        if (!AutoAnimation.instance) {
            this._container = document.createElement("div");
            this._timeouts = [];
            this._transtypelist = [];
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
        let animationDelay = 5500;
        let pauseDuration = 3500;
        let transitionDuration = 3000;
        this._container = ".demo-chart"
        //debug
        //给定图表之间的动画过渡类型
        //之后需要改成函数
        this._transtypelist.push('zoom')
        this._transtypelist.push('fade');
        this._transtypelist.push('wipe');
        this._transtypelist.push('dissolve');

        let chartnum = 4
        //let chartnum = 2
        console.log("start autoanimation.play")

        //debug
        //animationDelay = this.zoomTransition(0, animationDelay, pauseDuration, transitionDuration);

        for (let i=0; i<chartnum; i++){
            //animationDelay =  this.fadeTransition(i, animationDelay, pauseDuration, transitionDuration);
            //animationDelay = this.wipeTransition(i, animationDelay, pauseDuration, transitionDuration);
            //animationDelay = this.dissolveTransition(i, animationDelay, pauseDuration, transitionDuration);
            let type = this._transtypelist[i];
            switch(type) {
                case TransType.Fade:
                    animationDelay = this.fadeTransition(i, animationDelay, pauseDuration, transitionDuration);
                    break;
                case TransType.Wipe:
                    animationDelay = this.wipeTransition(i, animationDelay, pauseDuration, transitionDuration);
                    break;
                case TransType.Dissolve:
                    animationDelay = this.dissolveTransition(i, animationDelay, pauseDuration, transitionDuration);
                    break;
                case TransType.Zoom:
                    animationDelay = this.zoomTransition(0, animationDelay, pauseDuration, transitionDuration);
                    break;
                default:
                    console.log("wrong transtype")
                    return null;
            }

        }
    }

    fadeTransition(chartIndex, animationDelay, pauseDuration, transitionDuration) {
        let fade = new Fade();
        console.log("fade transitionDuration")
        console.log(transitionDuration)
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
        console.log("wipe transitionDuration")
        console.log(transitionDuration)
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
        console.log("dissolve transitionDuration")
        console.log(transitionDuration)

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

    zoomTransition(chartIndex, animationDelay, pauseDuration, transitionDuration) {
        let zoom = new Zoom();
        //zoom需要2倍的transitionDuration，此处的操作不影响其他transition类型
        transitionDuration = 2 * transitionDuration;
        console.log("zoom transitionDuration")
        console.log(transitionDuration)
        zoom.container(this.container());
        zoom.duration(transitionDuration)
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

        let zoomhandle;
        this._timeouts.push(setTimeout(function(){
            zoomhandle = "zoomIn"
            zoom.animateTransition(zoomhandle, originContainer);
        }, animationDelay));
        this._timeouts.push(setTimeout(function(){
            zoomhandle = "add"
            zoom.animateTransition(zoomhandle, newContainer);
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