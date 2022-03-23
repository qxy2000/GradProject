import React from "react";
import ChartType from "../visualization/charttype";
import ChartList from '../../ChartList'
import FieldType from "../visualization/fieldtype";
import { fact2visRules } from "./fact2visRule";
// import _ from 'lodash';
//import Chart from "../../Chart";

//getFactChartType：为fact匹配合适的chart类型
//fact：单个数据事实
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//type：fact中的type字段，代表fact的类型
const getFactChartType = (fact, schema, breakdown, type) => {
    let breakdownSchema = schema.filter(s => s.field === breakdown[0].field)
    let chartTypes;
    let rules = fact2visRules
    //过滤规则：根据fact type和breakdown type来筛选合适的图表
    chartTypes = rules.filter(x => x.fact === type);
    if (breakdown) {
        chartTypes = chartTypes.filter(x => x.breakdownType.indexOf(breakdownSchema[0].type) !== -1)
        //根据breakdown字段的取值数量选择chart类型
        if (breakdownSchema.type === FieldType.CATEGORICAL && breakdownSchema.values) {
            chartTypes = chartTypes.filter(x => {
                if (!x.rang) {
                    return true
                }
                else {
                    return breakdownSchema.values.length >= x.rang[0] && breakdownSchema.values.length <= x.rang[1]
                }
            });
        }
    }
    return chartTypes;
}

//fact2chart: 生成该fact的chart字段
//fact：单个数据事实
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//type：fact中的type字段，代表fact的类型
//size：图表的大小(large,wide,middle,small)
//return: specChart 该fact的chart字段
export const  fact2chart = function (fact, schema, breakdown, type, size){
    let charts = getFactChartType(fact,schema,breakdown,type);
    //从多个可能的chart类型中随机选择一个，并取出chart名
    console.log("charts")
    console.log(charts)
    let chart =  charts[getChoice(charts.length)].chart

    if (chart === ChartType.ISOTYPE_BAR) {
        chart = ChartType.VERTICAL_BAR_CHART;
    }

    let visChartType = getvischartype(chart);

    //生成chart字段
    let specChart = {
        size:size,
        type:visChartType,
        style: "business",
        duration: 0,
        //caption: "test",
    }
    return specChart;
}

export const fact2vis = function (spec){
    console.log("fact2vis function")
    console.log("spec")
    console.log(spec)
    // let testjson = require('../../spec/calliopechartTest.json')
    // console.log("testjson")
    // console.log(testjson)
    // return <Chart spec={testjson} />
    //return <Chart spec={spec} />
    return spec;
}

//将chart类型映射为最终几种的chart类型
const getvischartype = (chart) => {
    let chartType = chart;
    switch (chart) {
        case ChartType.AREA_CHART:
            chartType = "areachart";
            break;
        case ChartType.BUBBLE_CHART:
            chartType = "bubblechart";
            break;
        case ChartType.COLOR_FILLING_MAP:
            chartType = "filledmap";
            break;
        case ChartType.BUBBLE_MAP:
            chartType = "bubblemap";
            break;
        case ChartType.HALF_RING_CHART:
            chartType = "donutchart";
            break;
        case ChartType.HORIZONTAL_BAR_CHART:
            chartType = "horizentalbarchart";
            break;

        case ChartType.VERTICAL_BAR_CHART:
        case ChartType.STACKED_BAR_CHART:
        case ChartType.VERTICAL_DIFFERENCE_BAR_CHART:
        case ChartType.ISOTYPE_BAR_CHART:
        case ChartType.VERTICAL_DIFFERENCE_ARROW_CHART:
            chartType = "verticalbarchart"
            break;
        case ChartType.LINE_CHART:
        case ChartType.STACKED_LINE_CHART:
            chartType = "linechart";
            break;
        case ChartType.PROPORTION_ISOTYPE_CHART:
        case ChartType.PIE_CHART:
            chartType = "piechart";
            break;
        case ChartType.PROGRESS_BAR_CHART:
            chartType = "progresschart";
            break;
        case ChartType.RING_CHART:
            chartType = "donutchart";
            break;
        case ChartType.SCATTER_PLOT:
            chartType = "scatterplot";
            break;
        case ChartType.TEXT_CHART:
            chartType = "textchart";
            break;
        case ChartType.TREE_MAP:
            chartType = "treemap";
            break;
        default:
            break;
    }
    return chartType;
}

export const getChoice = (length) => {
    let choice = Math.round(Math.random() * (length - 1));
    return choice;
}


