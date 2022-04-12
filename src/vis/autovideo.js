import Fact from './fact';
import { fact2chart, fact2vis } from "./recommendation/fact2visCal"
import { fact2action } from './recommendation/fact2vis';
import { fact2trans } from './recommendation/fact2trans';
import TupleType from './visualization/tupletype';
import _ from 'lodash';
import { select } from 'd3';
import { act } from 'react-dom/test-utils';
//import Chart from '../Chart';


class AutoVideo {
    constructor() {
        this._container = document.createElement("div");
        this._paragraph = document.createElement("p");
        this._spec = {};
    }

    container(value) {
        if (!value) {
            return this._container;
        }
        this._container = value;
    }

    paragraph(value) {
        if (!value) {
            return this._paragraph;
        }
        this._paragraph = value;
    }

    load(spec) {
        this._spec = spec;
    }

    //判断字段是否相等
    isEqual(tuple1, tuple2, type){
        if(tuple1.length === tuple2.length){
            switch(type){
                case TupleType.SUBSPACE:
                    for(let i=0; i<tuple1.length; i++){
                        if(tuple1[i].field === tuple2[i].field){
                            if(tuple1[i].value !== tuple2[i].value){return false;}
                        }
                        else{
                            return false;
                        }
                    }
                    return true;
                    break;
                case TupleType.MEASURE:
                    for(let i=0; i<tuple1.length; i++){
                        if(tuple1[i].field !== tuple2[i].field){
                            return false;
                        }
                    }
                    return true;
                    break;
                case TupleType.BREAKDOWN:
                    for(let i=0; i<tuple1.length; i++){
                        if(tuple1[i].field !== tuple2[i].field){
                            return false;
                        }
                    }
                    return true;
                    break;
                case TupleType.FOCUS:
                    for(let i=0; i<tuple1.length; i++){
                        if(tuple1[i].field === tuple2[i].field){
                            if(tuple1[i].value !== tuple2[i].value){return false;}
                        }
                        else{
                            return false;
                        }
                    }
                    return true;
                    break;
                default:
                    console.log("wrong tupleType")
                    return null;
            }         
        }
        else{
            return false
        }
    }

    //判断两个fact生成的图表是否重复
    isDuplicated(factspec1, factspec2, charttype1, charttype2){
        let subspaceDuplicationMark = this.isEqual(factspec1.subspace, factspec2.subspace, TupleType.SUBSPACE);
        let measureDuplicationMark = this.isEqual(factspec1.measure, factspec2.measure, TupleType.MEASURE);
        let breakdownDuplicationMark = this.isEqual(factspec1.breakdown, factspec2.breakdown, TupleType.BREAKDOWN);
        let focusDuplicationMark = this.isEqual(factspec1.focus, factspec2.focus, TupleType.FOCUS);
        let charttypeDuplicationMark;
        if(charttype1 === charttype2){
            charttypeDuplicationMark = true;
        }
        else{
            charttypeDuplicationMark = false;
        }
        //前后两个图表完全相同
        if(subspaceDuplicationMark && measureDuplicationMark && breakdownDuplicationMark && focusDuplicationMark && charttypeDuplicationMark){
            return true;
        }
        else{
            return false;
        }
    }

    //use calliope-chart to test
    generateCalliope() {
        //STEP 0: parse specifation
        let spec = this._spec;
        let dataspec = spec.data ? spec.data : {};
        let factlistspec = spec.facts ? spec.facts : {};

        console.log("spec")
        console.log(spec)
        
        //STEP 1: 根据fact生成chart/action字段
        //STEP 2: 整合成新的输入spec传给calliope-chart/narrative chart
        //STEP 3: 将生成的svg用动画相连
        //STEP 4: 生成video

        let fact = new Fact();
        fact.schema(dataspec.schema);
        //将factlist中的fact取出来，单独操作
        let specVisList = [];
        for (let i=0; i<factlistspec.length; i++){
            //生成fact字段
            let factspec = fact.load(factlistspec[i]);
            //生成chart字段
            //先将size设置为定值
            let size = "small";
            let schema = fact._schema;
            let breakdown = factspec.breakdown;
            let type = factspec.type;
            let chartspec = fact2chart(fact, schema, breakdown, type, size);
            let newspec = {
                    "data": dataspec,
                    "fact": factspec,
                    "chart": chartspec
                }
            let specVis = _.cloneDeep(newspec)
            console.log("specVis")
            console.log(specVis)
            specVisList.push(specVis);
        }
        console.log("specVisList")
        console.log(specVisList)

        return specVisList;
    }

    generate() {
        //STEP 0: parse specifation
        let spec = this._spec;
        let dataspec = spec.data ? spec.data : {};
        let factlistspec = spec.facts ? spec.facts : {};

        console.log("spec")
        console.log(spec)
        
        //STEP 1: 根据fact生成action字段，action字段包括三部分：
        //          1. Data Preprocessing
        //          2. Visualization
        //          3. Annotation
        //STEP 2: 整合成新的输入spec传给narrative chart
        //STEP 3: 将生成的svg用动画相连
        //STEP 4: 生成video
        let fact = new Fact();
        fact.schema(dataspec.schema);
        //将factlist中的fact取出来，单独操作

        let specVisList = [];
        let transtypelist = [];
        let preChartType;
        //生成action字段
        //debug
        let factNum = factlistspec.length
        //let factNum =1
        for (let i=0; i<factNum; i++){
            let actionspec = [];
            //生成fact字段
            let factspec = fact.load(factlistspec[i]); 
            //生成Data Preprocessing字段
            //fact中的"measure"字段对应action中的"select"字段
            let selectspec = factspec.measure;
            //fact中的"breakdown"字段对应action中的"groupby"字段
            let groupbyspec = factspec.breakdown;
            //fact中的"subspace"字段对应action中的"filter"字段
            let filterspec = factspec.subspace;

            let dataprespec = {
                "select": selectspec,
                "groupby": groupbyspec,
                "filter": filterspec
            };
            actionspec.push(dataprespec);
            console.log("dataprespec")
            console.log(dataprespec)

            //生成Visualation字段
            //fact中的"type"用于生成chart类型
            let schema = fact._schema;
            let breakdown = factspec.breakdown;
            let measure = factspec.measure;
            let type = factspec.type;
            let visspec = fact2action(fact, schema, breakdown, measure, type);

            //判断是否为重复的图表，若不是，则选择过渡动画类型；若是，则舍去此fact，避免重复
            //从第一个fact之后开始选择，第一个fact之前不需要过渡动画
            if (i > 0) {
                let chartType = visspec[0].mark
                let prefactspec = fact.load(factlistspec[i-1]); 
                let duplicationMark = this.isDuplicated(prefactspec, factspec, preChartType, chartType)
                //当前后两个图表完全相同时，舍弃后一个图表，避免重复
                if(duplicationMark){
                    //跳过之后的语句，直接执行下一个循环
                    continue;
                }

                //若两个图表没有重复，则进行两个fact之间过渡动画的选择
                let transtype = fact2trans(prefactspec, factspec);
                console.log("autoVideo transtype")
                console.log(transtype)
                //let transtype = _.cloneDeep(trans)
                transtypelist.push(transtype)
            }
            //更新preChartType
            preChartType = visspec[0].mark
            console.log("preChartType")
            console.log(preChartType)

            for(let i=0; i<visspec.length; i++){
                actionspec.push(visspec[i]);
            }

            //生成Annotation字段
            //fact中的"focus"字段对应action中的"annotation"字段 ?
            //可能有多个annotation，是添加多个annotation字段还是添加annotation中target的元素?
            //annotation_method字段如何确定？
            //annotation_method此处暂时写为静态值，之后需要改成函数
            let methodspec = "fill"
            let targetspec = factspec.focus
            //若focus字段有值，则添加对应的annotation
            if(targetspec.length !== 0){
                let annospec = {
                    "add": "annotation",
                    "method": methodspec,
                    "target": targetspec
                }
                actionspec.push(annospec);
            }

            let newspec = {
                "data": dataspec,
                "actions": actionspec
            }
            let specVis = _.cloneDeep(newspec)
            console.log("specVis")
            console.log(specVis)
            specVisList.push(specVis);
        }
        console.log("specVisList")
        console.log(specVisList)

        console.log("transtypelist")
        console.log(transtypelist)
        let result = {
            "specVisList": specVisList,
            "transtypelist": transtypelist
        }

        return result;
    }

}

export default AutoVideo;