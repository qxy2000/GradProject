import * as d3 from 'd3';
import Transition from '../../transition';

class Fade extends Transition {
    animateTransition() {
        console.log("in fade")
        d3.select(this.container())
          .transition()
          .duration(this.duration())
          .ease(d3.easeLinear)
          .style('opacity', 0)
          .transition()
          .style('opacity', 1);
    }
}

export default Fade;