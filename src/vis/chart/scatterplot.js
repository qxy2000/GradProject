import { renderIntoDocument } from "react-dom/test-utils";
import FieldType from "../visualization/fieldtype";


//getScatterplotSpec: 获取Scatterplot的action参数：包括x，y，size，color等
//schema：data的schema字段，记录每个fact的field信息
//breakdown：fact中的breakdown字段
//measure: fact中的measure字段
//return: encodingspec Scatterplot的action参数数组
export const getScatterplotSpec = function(schema, breakdown, measure){
    let breakdownSchema = schema.filter(s => s.field === breakdown[0].field)
    let measureNum = measure.length;
    let encodingspec = [];
    
    if (measureNum >= 2){
        //获取measure的type
        let measureSchemaFst = schema.filter(s => s.field === measure[0].field)
        let measureSchemaSnd = schema.filter(s => s.field === measure[1].field)
        if (measureSchemaFst[0].type !== FieldType.NUMERICAL || measureSchemaSnd[0].type !== FieldType.NUMERICAL){
            console.log("Scatterpolt wrong measure type")
            return;
        }
        //measure中的第一个元素作为encodingX（numeriacl类型）
        let encodingX = {
            "add": "encoding",
            "channel": "x",
            "field": {
                "field": measure[0].field,
                "type": measureSchemaFst[0].type
            }
        }
        encodingspec.push(encodingX);
        //measure中的第二个元素作为encodingY（numeriacl类型）
        let encodingY = {
            "add": "encoding",
            "channel": "y",
            "field": {
                "field": measure[1].field,
                "type": measureSchemaSnd[0].type
            }
        }
        encodingspec.push(encodingY);
        //若measure中有第三个元素，则作为encodingSize（numeriacl类型）
        if (measureNum >= 3){
            let measureSchemaTrd = schema.filter(s => s.field === measure[2].field)
            if (measureSchemaTrd[0].type === FieldType.NUMERICAL){
                let encodingSize = {
                    "add": "encoding",
                    "channel": "size",
                    "field": {
                        "field": measure[2].field,
                        "type": measureSchemaTrd[0].type
                    }
                }
                encodingspec.push(encodingSize);
            }
        }
        //groupby/breakdown字段中的元素作为color（categorical类型）
        if (breakdown && breakdownSchema[0].type === FieldType.CATEGORICAL) {
            let encodingColor = {
                "add": "encoding",
                "channel": "color",
                "field": {
                    "field": breakdown[0].field,
                    "type": breakdownSchema[0].type
                }
            }
            encodingspec.push(encodingColor);
        }

        console.log("Scatterplot encodingspec");
        console.log(encodingspec);

        return encodingspec;
    }
    else{
        console.log("Scatterpolt measure lacks")
        return;
    }
}