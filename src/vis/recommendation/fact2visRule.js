import FactType from "../visualization/facttype";
import ChartType from "../visualization/charttype";
import FieldType from "../visualization/fieldtype";

export const fact2visRules = [
    //assocation
    //measureLength代表该chart需要measure的元素数的最小值
    //SCATTER_PLOT不要求breakdownType
    {
        "fact": FactType.ASSOCIATION,
        "chart": ChartType.SCATTER_PLOT,
        "measureLen": 2,
        "breakdownType": []
    },
    //outlier
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.LINE_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.TEMPORAL]
    },
    //extreme
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.LINE_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.TEMPORAL]
    },
    //rank(最好改为HORIZENTAL_BAR_CHART)
    {
        "fact": FactType.RANK,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    //distribution
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    //difference
    {
        "fact": FactType.DIFFERENCE,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    //categorization
    {
        "fact": FactType.CATEGORIZATION,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    //trend
    {
        "fact": FactType.TREND,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.CATEGORICAL]
    },
    {
        "fact": FactType.TREND,
        "chart": ChartType.LINE_CHART,
        "measureLen": 1,
        "breakdownType": [FieldType.TEMPORAL]
    }
    //value
    //如何用VERTICAL_BAR_CHART表示value
    // {
    //     "fact": FactType.VALUE,
    //     "chart": ChartType.VERTICAL_BAR_CHART,
    //     "measureLen": 0,
    //     "breakdownType": [],
    // }
]