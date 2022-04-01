import FieldType from "../visualization/fieldtype";

//getLineChartspec: 获取LineChart的action参数：包括x，y，color等
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//measure: fact中的measure字段
//return: encodingspec LineChart的action参数数组
export const getLineChartspec = function(schema, breakdown, measure){
    let breakdownSchema = schema.filter(s => s.field === breakdown[0].field)
    let measureNum = measure.length;
    let breakdownNum = breakdown.length;
    let encodingspec = [];

    //breakdown中的第一个元素作为encodingX（temporal类型）
    if (breakdownNum > 0 && breakdownSchema[0].type === FieldType.TEMPORAL){
        let encodingX = {
            "add": "encoding",
            "channel": "x",
            "field": {
                "field": breakdown[0].field,
                "type": breakdownSchema[0].type
            }
        }
        encodingspec.push(encodingX);
        if (measureNum > 0) {
            let measureSchema = schema.filter(s => s.field === measure[0].field);
            if(measureSchema[0].type !== FieldType.NUMERICAL){
                console.log("LineChart wrong measure type")
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
            //encodingColor不确定是什么值

            console.log("LineChart encodingspec");
            console.log(encodingspec);

            return encodingspec;
        }
        else{
            console.log("LineChart measure lacks")
            return;
        }
    }
    else{
        console.log("LineChart breakdown lacks")
        return;
    }
}