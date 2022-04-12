import TransType from "../visualization/transtype";
import TupleType from "../visualization/tupletype";
import DataChangeType from "../visualization/datachangetype";
import { fact2transRules } from "./fact2transRule";
import _ from 'lodash';

//fact2trans: 选择连接两个fact的过渡动画类型
//fact1: 前一个fact的spec，包括type、subspace、breakdown、measure、focus等字段
//fact2: 后一个fact的spec，包括type、subspace、breakdown、measure、focus等字段
//return: transtype，这两个fact之间的过渡动画类型
export const fact2trans = function(fact1, fact2){
    let rules = fact2transRules;
    let optionalTransList = [];
    let changedTuple;
    let dataChange;
    let transTypes;

    let subspace1 = fact1.subspace;
    let measure1 = fact1.measure;
    let breakdown1 = fact1.breakdown;
    let subspace2 = fact2.subspace;
    let measure2 = fact2.measure;
    let breakdown2 = fact2.breakdown;

    console.log("subspace1: ")
    console.log(subspace1)
    console.log("subspace2: ")
    console.log(subspace2)
    console.log("measure1: ")
    console.log(measure1)
    console.log("measure2: ")
    console.log(measure2)
    console.log("breakdown1: ")
    console.log(breakdown1)
    console.log("breakdown2: ")
    console.log(breakdown2)

    //subpace改变
    if(!isEqual(subspace1,subspace2, TupleType.SUBSPACE)){
        changedTuple = TupleType.SUBSPACE
        //Filter Walk+, data fact的subspace进行了扩展
        if(subspace1.length > subspace2.length){
            dataChange = DataChangeType.FILTERWALKADD
        }
        //Filter Walk-, data fact的subspace进行了缩小
        else if (subspace1.length < subspace2.length){
            dataChange = DataChangeType.FILTERWALKSUB
        }
        //Dimension Walk, data fact的subspace进行了值替换
        else if (subspace1.length === subspace2.length){
            dataChange = DataChangeType.DIMENSIONWALK
        }
        transTypes = rules.filter(x => x.changedTuple === changedTuple);
        transTypes = transTypes.filter(x => x.dataChange === dataChange)
        console.log("subspace change---tranTypes[]")
        console.log(transTypes)
        for(let i=0; i<transTypes.length; i++){
            optionalTransList.push(transTypes[i].trans)
        }
    }

    //measure改变
    if (!isEqual(measure1,measure2, TupleType.MEASURE)){
        changedTuple = TupleType.MEASURE
        //Measure Walk, 更新measure字段
        dataChange = DataChangeType.MEASUREWALK
        transTypes = rules.filter(x => x.changedTuple === changedTuple);
        transTypes = transTypes.filter(x => x.dataChange === dataChange)
        console.log("measure change---tranTypes[]")
        console.log(transTypes)
        for(let j=0; j<transTypes.length; j++){
            optionalTransList.push(transTypes[j].trans)
        }
    }

    //breakdown改变
    if (!isEqual(breakdown1,breakdown2, TupleType.BREAKDOWN)) {
        changedTuple = TupleType.BREAKDOWN
        //Drill-Down, 细分data fact的breakdown
        if (breakdown1.length < breakdown2.length){
            dataChange = DataChangeType.DRILLDOWN
        }
        //Roll-Up, 汇总data fact的breakdown
        else if (breakdown1.length > breakdown2.length){
            dataChange = DataChangeType.ROLLUP
        }
        //Breakdown Walk, data fact中breakdown进行值替换
        else if (breakdown1.length === breakdown2.length){
            dataChange = DataChangeType.BREAKDOWNWALK
        }
        transTypes = rules.filter(x => x.changedTuple === changedTuple);
        transTypes = transTypes.filter(x => x.dataChange === dataChange)
        console.log("breakdown change---tranTypes[]")
        console.log(transTypes)
        for(let k=0; k<transTypes.length; k++){
            optionalTransList.push(transTypes[k].trans)
        }
    }
    console.log("optionalTransList[]")
    console.log(optionalTransList)

    let finalTranType;
    if(optionalTransList.length !== 0){
        if(optionalTransList.length === 1){
            // console.log("final transtype: optionalTransList[0]")
            // console.log(optionalTransList[0])
            finalTranType = optionalTransList[0];
        }
        else{
            let finalTransList = optionalTransList.filter(x => x===TransType.Dissolve || x===TransType.Zoom)
            if(finalTransList.length !== 0){
                //如果optionalTransList有Zoom或Dissolve，则优先选Zoom或Dissolve(可优化)
                finalTranType = finalTransList[getChoice(finalTransList.length)];
            }
            else{
                //如果optionalTransList没有Zoom或Dissolve，在optionalTransList中random选择一个合适的，此处可优化
                finalTranType = optionalTransList[getChoice(optionalTransList.length)];
            }
            //在optionalTransList中random选择一个合适的，此处可优化
            //finalTranType = optionalTransList[getChoice(optionalTransList.length)];
        }
    }
    else{
        //若没有合适的过渡动画，则选择fade
        finalTranType = TransType.Fade;
    }
    console.log("fact2trans: final transtype:")
    console.log(finalTranType)

    return finalTranType
}


const getChoice = (length) => {
    let choice = Math.round(Math.random() * (length - 1));
    return choice;
}

const isEqual = (array1, array2, type) => {
    if (array1.length === array2.length){
        for(let i=0; i<array1.length; i++){
            if (array1[i].field !== array2[i].field){
                return false;
            }
            else if(type === TupleType.SUBSPACE){
                if(array1[i].value !== array2[i].value){
                    return false;
                }
            }
        }
        return true
    }
    else{
        return false
    }
}