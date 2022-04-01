import * as d3 from 'd3';
import FactType from './visualization/facttype';
import AggregationType from './visualization/aggregationtype';

class Fact {
    constructor() {
        this._table = [];
        this._schema = [];
        this._type = "";
        this._measure = [];
        this._subspace = [];
        this._breakdown = [];
        this._focus = [];
        this._data = [];
    }

    table(value) {
        this._data = value;
        this._table = value;
    }

    schema(value) {
        this._schema = value;
    }

    //将factspec转换为图表库输入需要的factspec格式
    //spec: 每个fact的spec
    load(spec){
        this._type = spec.type ? spec.type : FactType.DISTRIBUTION;
        //  去掉subtype字段，仅保留field字段和aggregate字段
        this._measure = [];
        if (spec.measure.length !== 0) {
            for(let i=0; i<spec.measure.length; i++){
                let measure = {"field": spec.measure[i].field, "aggregate": spec.measure[i].aggregate}
                this._measure.push(measure);
            }
            // this._measure = [{"field": spec.measure[0].field, "aggregate": spec.measure[0].aggregate}]
            // let testmeasure = [{"field": spec.measure[0].field, "aggregate": spec.measure[0].aggregate}]
        }
        else {
            this._measure = [{ "aggregate": "count" }];
        }
        this._subspace = spec.subspace? spec.subspace : [];
        //  输入的数据故事中fact的groupby字段对应此处的breakdown字段
        if (spec.groupby.length !== 0) {
            this._breakdown = [{"field": spec.groupby[0]}]
        }
        this._focus = spec.focus ? spec.focus : [];
        let fact = {
            "type": this._type,
            "subspace": this._subspace,
            "measure": this._measure,
            "breakdown": this._breakdown,
            "focus": this._focus
        }
        return fact;
    }
}

export default Fact;