import DataChangeType from "../visualization/datachangetype";
import TransType from "../visualization/transtype";
import TupleType from "../visualization/tupletype";
import ChartType from "../visualization/charttype";

export const fact2transRules = [
    //subspace改变
    {
        "changedTuple": TupleType.SUBSPACE,
        "dataChange": DataChangeType.FILTERWALKADD,
        "trans": TransType.Wipe
    },
    {
        "changedTuple": TupleType.SUBSPACE,
        "dataChange": DataChangeType.FILTERWALKSUB,
        "trans": TransType.Zoom
    },
    {
        "changedTuple": TupleType.SUBSPACE,
        "dataChange": DataChangeType.DIMENSIONWALK,
        "trans": TransType.Wipe
    },
    {
        "changedTuple": TupleType.SUBSPACE,
        "dataChange": DataChangeType.DIMENSIONWALK,
        "trans": TransType.Dissolve
    },
    //如何处理fade in subspace change
    // {
    //     "changedTuple": TupleType.SUBSPACE,
    //     "dataChange": DataChangeType.DIMENSIONWALK,
    //     "trans": TransType.Fade
    // },
    //measure改变
    {
        "changedTuple": TupleType.MEASURE,
        "dataChange": DataChangeType.MEASUREWALK,
        "trans": TransType.Wipe
    },
    // {
    //     "changedTuple": TupleType.MEASURE,
    //     "dataChange": DataChangeType.MEASUREWALK,
    //     "trans": TransType.Fade
    // },
    //breakdown改变
    {
        "changedTuple": TupleType.BREAKDOWN,
        "dataChange": DataChangeType.DRILLDOWN,
        "trans": TransType.Zoom
    },
    {
        "changedTuple": TupleType.BREAKDOWN,
        "dataChange": DataChangeType.ROLLUP,
        "trans": TransType.Dissolve
    },
    //wipe在breakdown改变中如何处理
    // {
    //     "changedTuple": TupleType.BREAKDOWN,
    //     "dataChange": DataChangeType.BREAKDOWNWALK,
    //     "trans": TransType.Wipe
    // },
    {
        "changedTuple": TupleType.BREAKDOWN,
        "dataChange": DataChangeType.BREAKDOWNWALK,
        "trans": TransType.Fade
    }
]