import React, { useMemo } from "react"
import { VictoryLine } from "victory-native"
import { getLineData } from "./helpers"


interface GraphLineProps {
    color: string,
    data: any[],
    value: number
}


export const GraphLine = ({ color, data, value }: GraphLineProps) => {

    const lineData = useMemo(() => getLineData({ array: data, value: value }), [data.length, data]);

    return <VictoryLine
        style={{
            data: {
                stroke: color,
            }
        }}
        data={lineData}
    />
}