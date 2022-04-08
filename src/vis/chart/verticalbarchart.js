import FieldType from "../visualization/fieldtype";


//getVerticalBarChartSpec: 获取VerticalBarChart的action参数：包括x，y，color等
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//measure: fact中的measure字段
//return: encodingspec VerticalBarChart的action参数数组
export const getVerticalBarChartSpec = function(schema, breakdown, measure){
    let breakdownSchema = schema.filter(s => s.field === breakdown[0].field)
    let measureNum = measure.length;
    let breakdownNum = breakdown.length;
    let encodingspec = [];

    //breakdown中的第一个元素作为encodingX（categorical类型）
    if(breakdownNum > 0 && breakdownSchema[0].type === FieldType.CATEGORICAL){
        let encodingX = {
            "add": "encoding",
            "channel": "x",
            "field": {
                "field": breakdown[0].field,
                "type": breakdownSchema[0].type
            }
        }
        encodingspec.push(encodingX);
        if (measureNum > 0){
            let measureSchema = schema.filter(s => s.field === measure[0].field);
            if(measureSchema[0].type !== FieldType.NUMERICAL){
                console.log("VerticalBarChart wrong measure type")
                return;
            }
            //measure中的第一个元素作为encodingY（numeriacl类型）
            let encodingY = {
                "add": "encoding",
                "channel": "y",
                "field": {
                    "field": measure[0].field,
                    "type": measureSchema[0].type
                }
            }
            encodingspec.push(encodingY)

            //用breakdown中的第二个元素作为colorEncoding（categorical类型）
            if (breakdownNum > 1){
                let breakdownSndSchema = schema.filter(s => s.field === breakdown[1].field)
                if(breakdownSndSchema[0].type === FieldType.CATEGORICAL){
                    let encodingColor = {
                        "add": "encoding",
                        "channel": "color",
                        "field": {
                            "field": breakdown[1].field,
                            "type": breakdownSndSchema[0].type
                        }
                    }
                    encodingspec.push(encodingColor)
                }
            }

            console.log("VerticalBarChart encodingspec");
            console.log(encodingspec);

            return encodingspec;
        }
        else{
            console.log("VerticalBartChart measure lacks")
            return;
        }
    }
    else{
        console.log("VerticalBartChart breakdown lacks")
        return;
    }
    
}