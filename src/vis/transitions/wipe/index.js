import * as d3 from 'd3';
import Transition from '../../transition';

class Wipe extends Transition{
    //handle: "move"或"add"，代表将原container移出或者将新container移入
    //container: 对此container进行操作
    animateTransition(handle, container) {
        //分成两段试试
        console.log("in wipe")
        //let moveLength = "400px"
        if (handle === "move"){
            d3.select(container)
              .transition()
              .duration(this.duration())
              .ease(d3.easeLinear)
              //.style("transform","translate(-1100px, 0px)")
              //与App.css中".demo-chart"和".new-chart"的"left"值有关
              .style("left", "-300px")
            
            d3.select(container)
              .transition()
              .delay(this.duration())
              .style("opacity", 0)
              .transition()
              //每次move结束都回到初始位置
              .style("left", "100px")
            console.log("handle==move")
            console.log(handle)
            console.log(container)
        }
        else if (handle === "add") {
            d3.select(container)
            //.style("transform", "translate(500px, 0px")
              .style("opacity", 1)
              //将container移动到右侧准备进入画面
              .style("left", "500px")
              .transition()
              .duration(this.duration())
              .ease(d3.easeLinear)
              //.style("transform", "translate(-1100px, 0px)")
              //与App.css中".demo-chart"和".new-chart"的"left"值有关
              .style("left", "100px")
            console.log("handle==add")
            console.log(handle)
            console.log(container)
        }
        else {
            console.log("false handle value")
            console.log(handle)
        }
        // if (handle === "move") {
        //     d3.select(container)
        //       .transition()
        //       .delay(this.duration())
        //       .style("opacity", 0)
        //       .transition()
        //       //.style("transform", "translate(2200px, 0px)")
        //       //与App.css中".demo-chart"和".new-chart"的"left"值有关
        //       .style("left", "500px")
        // }
    }
}

export default Wipe;