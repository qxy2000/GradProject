import Fact from './fact';
import { fact2chart, fact2vis } from "./recommendation/fact2vis"
import _ from 'lodash';
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

    generate() {
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

}

export default AutoVideo;