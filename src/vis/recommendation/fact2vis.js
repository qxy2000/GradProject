import ChartType from "../visualization/charttype";
import FieldType from "../visualization/fieldtype";
import { getChoice } from "./fact2visCal";
import { fact2visRules } from "./fact2visRule";
import { getScatterplotSpec } from "../chart/scatterplot";
import { getVerticalBarChartSpec } from "../chart/verticalbarchart";

//getFactChartType：为fact匹配合适的chart类型
//fact：单个数据事实
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//measure: fact中的measure字段
//type：fact中的type字段，代表fact的类型
const getFactChartType = (fact, schema, breakdown, measure, type) => {
    let breakdownSchema = schema.filter(s => s.field === breakdown[0].field);
    let chartTypes;
    let rules = fact2visRules;
    //过滤规则：根据fact type、breakdown type和measure Length来筛选合适的图表
    chartTypes = rules.filter(x => x.fact === type);
    chartTypes = chartTypes.filter(x => x.measureLen <= measure.length);
    // chartTypes = chartTypes.filter(x => x.breakdownType.indexOf(breakdownSchema[0].type) !== -1)

    console.log("measure.length")
    console.log(measure.length)
    console.log("chartTypes after facttype filter and measure filter")
    console.log(chartTypes)

    chartTypes = chartTypes.filter(x => {
        //若breakdownType为空，说明不需要具体的breakdownType
        if(x.breakdownType.length === 0) {
            return true
        }
        //否则需要判断breakdown的值
        else{
            if (breakdown){
                return x.breakdownType.indexOf(breakdownSchema[0].type) !== -1
            }
            else {
                return false;
            }
        }
    })
    return chartTypes;
}

//fact2action: 生成的改fact的action字段
//fact：单个数据事实
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//measure: fact中的measure字段
//type：fact中的type字段，代表fact的类型
//return: action[]数组,该fact与visualization有关的action字段
export const fact2action = function(fact, schema, breakdown, measure, type){
    let charts = getFactChartType(fact, schema, breakdown, measure, type);
    console.log("optional charts")
    console.log(charts)
    //从多个可能的chart类型中随机选择一个(后期可优化)，并取出chart名
    let chart = charts[getChoice(charts.length)].chart
    let visActions = [];
    let chartMark;
    let markspec;
    let encodingspec;
    switch(chart) {
        case ChartType.SCATTER_PLOT:
            chartMark = "point";
            markspec = {
                "add": "chart",
                "mark": chartMark
            }
            visActions.push(markspec);
            encodingspec = getScatterplotSpec(schema, breakdown, measure)
            for(let i=0; i<encodingspec.length; i++){
                visActions.push(encodingspec[i]);
            }
            break;
        case ChartType.VERTICAL_BAR_CHART:
            chartMark = "bar";
            markspec = {
                "add": "chart",
                "mark": chartMark
            }
            visActions.push(markspec);
            encodingspec = getVerticalBarChartSpec(schema, breakdown, measure)
            for(let i=0; i<encodingspec.length; i++){
                visActions.push(encodingspec[i]);
            }
            break;
        default:
            console.log("wrong ChartType")
            break
    }

    console.log("visAction: actionspec for visualization")
    console.log(visActions);

    return visActions;
}