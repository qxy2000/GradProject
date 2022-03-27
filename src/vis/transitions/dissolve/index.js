import * as d3 from 'd3';
import Transition from '../../transition';

class Dissolve extends Transition {
    //handle: 操作类型"dissovleIn" "dissolveOut"，分别代表淡入和淡出
    //container： 在此container上进行操作
    animateTransition(handle, container) {
        console.log("in dissolve")
        if (handle === "dissolveOut") {
            d3.select(container)
              .transition()
              .duration(this.duration())
              .ease(d3.easeLinear)
              .style('opacity', 0)
        }
        else if (handle === "dissolveIn") {
            d3.select(container)
              .transition()
              .duration(this.duration())
              .ease(d3.easeLinear)
              .style('opacity', 1)
        }
        else {
            console.log("false handle value")
            console.log(handle)
        }
    }
}

export default Dissolve;