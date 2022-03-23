// import FactType from '../constant/FactType';
// import ChartType from '../constant/ChartType';
// import FieldType from '../constant/FieldType';
import FactType from '../visualization/facttype';
import ChartType from '../visualization/charttype';
import FieldType from '../visualization/fieldtype';


export const fact2visRules = [
    //association 
    {
        "fact": FactType.ASSOCIATION,
        "chart": ChartType.SCATTER_PLOT,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL]
    },
    //outlier
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
        //"rang": [0, 9]
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.AREA_CHART,
        "breakdownType": [FieldType.TEMPORAL]
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.LINE_CHART,
        "breakdownType": [FieldType.TEMPORAL]
    },
    {
        "fact": FactType.OUTLIER,
        "chart": ChartType.BUBBLE_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
        "rang": [6, 9]
    },
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.OUTLIER,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    // {
    //     "fact": FactType.OUTLIER,
    //     "chart": ChartType.BUBBLE_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    //extreme
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
        //"rang": [0, 9]
    },
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.TEXT_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    {
        "fact": FactType.EXTREME,
        "chart": ChartType.LINE_CHART,
        "breakdownType": [FieldType.TEMPORAL],
    },
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.EXTREME,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    // {
    //     "fact": FactType.EXTREME,
    //     "chart": ChartType.BUBBLE_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    //proportion
    //改为ChartType.PROGRESS_CHART
    // {
    //     "fact": FactType.PROPORTION,
    //     "chart": ChartType.PROGRESS_BAR_CHART,
    //     "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    // },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.PROGRESS_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.TREE_MAP,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    //暂时注释RING_CHART
    // {
    //     "fact": FactType.PROPORTION,
    //     "chart": ChartType.RING_CHART,
    //     "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    // },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.PIE_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.PROPORTION,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    // {
    //     "fact": FactType.PROPORTION,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    {
        "fact": FactType.PROPORTION,
        "chart": ChartType.BUBBLE_MAP,
        "breakdownType": [FieldType.GEOGRAPHICAL],
    },
    // {
    //     "fact": FactType.PROPORTION,
    //     "chart": ChartType.VERTICAL_BAR_CHART,
    //     "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    //     "rang": [0, 9]
    // },

    //rank
    {
        "fact": FactType.RANK,
        "chart": ChartType.HORIZENTAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.RANK,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    {
        "fact": FactType.RANK,
        "chart": ChartType.BUBBLE_MAP,
        "breakdownType": [FieldType.GEOGRAPHICAL],
    },
    // {
    //     "fact": FactType.RANK,
    //     "chart": ChartType.LINE_CHART,
    //     "breakdownType": [FieldType.TEMPORAL],
    // },
    //distribution
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.DISTRIBUTION,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.BUBBLE_MAP,
        "breakdownType": [FieldType.GEOGRAPHICAL],
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.BUBBLE_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.AREA_CHART,
        "breakdownType": [FieldType.TEMPORAL],
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.TREE_MAP,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
        "rang": [6, 10000]
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
        "rang": [0, 9]
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.HORIZONTAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    {
        "fact": FactType.DISTRIBUTION,
        "chart": ChartType.PIE_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    //difference
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.DIFFERENCE,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    {
        "fact": FactType.DIFFERENCE,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
        // "rang": [0, 9]
    },
    // {
    //     "fact": FactType.DIFFERENCE,
    //     "chart": ChartType.TEXT_CHART,
    //     "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    // },
    {
        "fact": FactType.DIFFERENCE,
        "chart": ChartType.PIE_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    {
        "fact": FactType.DIFFERENCE,
        "chart": ChartType.HORIZONTAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL, FieldType.TEMPORAL],
    },
    //categorization
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.CATEGORIZATION,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [FieldType.GEOGRAPHICAL],
    // },
    {
        "fact": FactType.CATEGORIZATION,
        "chart": ChartType.TREE_MAP,
        "breakdownType": [FieldType.CATEGORICAL],
        "rang": [6, 10000]
    },
    {
        "fact": FactType.CATEGORIZATION,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "breakdownType": [FieldType.CATEGORICAL],
        "rang": [0, 9]
    },
    {
        "fact": FactType.CATEGORIZATION,
        "chart": ChartType.BUBBLE_CHART,
        "breakdownType": [FieldType.CATEGORICAL],
        "rang": [6, 9]
    },
    //trend
    {
        "fact": FactType.TREND,
        "chart": ChartType.LINE_CHART,
        "breakdownType": [FieldType.TEMPORAL],
    },
    {
        "fact": FactType.TREND,
        "chart": ChartType.AREA_CHART,
        "breakdownType": [FieldType.TEMPORAL],
    },
    {
        "fact": FactType.TREND,
        "chart": ChartType.VERTICAL_BAR_CHART,
        "rang": [0, 9],
        "breakdownType": [FieldType.TEMPORAL, FieldType.CATEGORICAL],
    },
    // {
    //     "fact": FactType.TREND,
    //     "chart": ChartType.HORIZONTAL_BAR_CHART,
    //     "rang": [0, 9],
    //     "breakdownType": [FieldType.TEMPORAL],
    // },
    {
        "fact": FactType.TREND,
        "chart": ChartType.BUBBLE_CHART,
        "rang": [6, 9],
        "breakdownType": [FieldType.TEMPORAL, FieldType.TEMPORAL],
    },
    // {
    //     "fact": FactType.TREND,
    //     "chart": ChartType.SCATTER_PLOT,
    //     "breakdownType": [FieldType.TEMPORAL],
    // },
    //value
    {
        "fact": FactType.VALUE,
        "chart": ChartType.TEXT_CHART,
        "breakdownType": [],
    },
    {
        "fact": FactType.VALUE,
        "chart": ChartType.HORIZONTAL_BAR_CHART,
        "breakdownType": [],
    },
    {
        "fact": FactType.VALUE,
        "chart": ChartType.VERTICAL_BAR_CHART,
        // "rang": [0, 9],
        "breakdownType": [],
    },
    {
        "fact": FactType.VALUE,
        "chart": ChartType.BUBBLE_MAP,
        "breakdownType": [],
    },
    //暂时注释COLOR_FILLING_MAP
    // {
    //     "fact": FactType.VALUE,
    //     "chart": ChartType.COLOR_FILLING_MAP,
    //     "breakdownType": [],
    // }
]