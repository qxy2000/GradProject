import * as d3 from 'd3';
import Transition from '../../transition';

class Zoom extends Transition {
    //handle: 操作类型"zoomIn" "add"，分别代表zoomIn原图表和添加新图表
    //container： 在此container上进行操作
    animateTransition(handle, container){
        console.log("in zoom")
        let zoom = d3.zoom()
                     .scaleExtent([0.5, 10])
                     .on('zoom', function(e){
                         d3.select('svg g')
                           .attr('transform', e.transform);
                     })
        if (handle === "zoomIn") {
            //zoomIn需要放大整个svg大小
            //获取svg原大小
            let vis = d3.select(container)
                        .selectAll('svg')
            let svgWidth =  vis.style("width")
            let svgHeight = vis.style("height")
            //video window的相关参数
            let videoTop = 250;    
            let videoHeight = 400;     //700-250-50=400
            let videoWidth = 500;
            //计算svg放大后的坐标，以及放大后的height和width（与video的参数有关）(等比例放大)
            let visWidth = 1.5 * videoWidth;
            let visHeight =  1.5 * (parseFloat(svgHeight)/parseFloat(svgWidth)) * videoWidth ;
            //计算svg平移值（边平移边放大）
            let transX = -(parseFloat(visWidth) - parseFloat(svgWidth))/2
            let transY = -(parseFloat(visHeight) - parseFloat(svgHeight))/2
            
            d3.select(container)
              .selectAll('svg')
              .transition()
              .duration(this.duration()/2)
              .ease(d3.easeLinear)
              //在缩放的同时调整svg的大小和位置
              .attr('height', visHeight)
              .attr('width', visWidth)
              //调整svg的位置，等比例从中心放大
              .attr("transform", "translate(" + transX + "," + transY + ")")
              //zoom缩放
              //zoom的速度问题，size和zoom的速度
              .call(zoom.scaleBy, 5);

            d3.select(container)
              .selectAll('svg')
              .transition()
              .delay(this.duration()/2)
              .duration(this.duration()/2)
              .style('opacity', 0)
        }
        else if (handle === "add") {
            d3.select(container)
              .style('opacity', 0)
              .transition()
              .delay(this.duration()/2)
              .duration(this.duration()/2)
              .ease(d3.easeLinear)
              .style('opacity', 1)
        }
    }
}

export default Zoom;