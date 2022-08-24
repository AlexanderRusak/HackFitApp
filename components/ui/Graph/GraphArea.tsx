import React, { useMemo } from "react"
import { VictoryArea } from "victory-native"
import { getAreaData } from "./helpers";


interface GraphAreaProps {
    color: string,
    fillOpacity: number,
    maxValue: number,
    minValue: number,
    data: any[]

}

export const GraphArea = ({ color, fillOpacity, data, maxValue, minValue }: GraphAreaProps) => {

    const areaData = getAreaData({ array: data, maxValue, minValue });
    console.log(areaData);


    return <VictoryArea
        style={{
            data: {
                fill: color,
                fillOpacity: fillOpacity
            }
        }}
        data={areaData}
    />
}