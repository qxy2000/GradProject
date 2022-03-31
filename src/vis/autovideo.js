import Fact from './fact';
import { fact2chart, fact2vis } from "./recommendation/fact2vis"
import _ from 'lodash';
import { select } from 'd3';
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
        let actionspec = [];
        //生成action字段
        for (let i=0; i<factlistspec.length; i++){
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

            //生成Visualation字段
            //fact中的"type"用于生成chart类型
            

            //生成chart字段
            //先将size设置为定值
            let size = "small";
            let schema = fact._schema;
            let breakdown = factspec.breakdown;
            let type = factspec.type;
            let chartspec = fact2chart(fact, schema, breakdown, type, size);

            //生成Annotation字段
            //fact中的"focus"字段对应action中的"annotation"字段 ?
            //可能有多个annotation，是添加多个annotation字段还是添加annotation中target的元素?
            //annotation_method字段如何确定？
            //annotation_method此处暂时写为静态值，之后需要改成函数
            let methodspec = "fill"
            let targetspec = factspec.focus
            let annospec = {
                "add": "annotation",
                "method": methodspec,
                "target": targetspec
            }
            actionspec.push(annospec);
    


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

}

export default AutoVideo;