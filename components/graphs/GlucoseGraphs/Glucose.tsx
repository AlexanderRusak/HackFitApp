import React, { useMemo } from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { VictoryArea, VictoryBar, VictoryChart, VictoryLine, VictoryScatter, VictoryStack } from "victory-native"
import { GraphMain } from "../../../constants/interfaces/GraphMain"
import { IStore } from "../../../store"
import { graphColors, theme } from "../../../styles/theme"
import { GraphArea } from "../../ui/Graph/GraphArea"
import { GraphLine } from "../../ui/Graph/GraphLine"
import { getAreaData, getLineData } from "../../ui/Graph/helpers"


interface Glucose extends GraphMain { }


export const GlucoseGraph = ({ color }: Glucose) => {



    const data = [
        { x: 0, y: 170 },
        { x: 1, y: 200 },
        { x: 2, y: 210 },
        { x: 3, y: 180 },
        { x: 4, y: 160 },
        { x: 5, y: 70 }
    ];

    const maxRangeLine = useMemo(() => getLineData({ array: data, value: 200 }), [data]);
    const minLineRange = useMemo(() => getLineData({ array: data, value: 80 }), [data]);
    const maxRangeArea = useMemo(() => getAreaData({ array: data, maxValue: 250, minValue: 200 }), [data]);
    const minRangeArea = useMemo(() => getAreaData({ array: data, maxValue: 80, minValue: 0 }), [data]);
    const midRangeArea = useMemo(() => getAreaData({ array: data, maxValue: 200, minValue: 80 }), [data]);


    return <View>
        <Text style={{ color: color }}>Glucose Graph</Text>
        <Text>Current {data[data.length-1].y}</Text>
        <VictoryChart
        scale={{
            x:'time',
            y:'linear'
        }}
            animate={true}
        >
            <VictoryArea
                style={{
                    data: {
                        fill: graphColors.yellow,
                        opacity: 0.6
                    }
                }}
                data={maxRangeArea}

            />
            <VictoryLine
                style={{
                    data: {
                        stroke: graphColors.yellow,
                        strokeWidth: 3
                    }
                }}
                data={maxRangeLine}
            />

            <VictoryArea
                style={{
                    data: {
                        fill: graphColors.grey,
                        opacity: 0.3
                    }
                }}
                data={midRangeArea}
            />

            <VictoryArea
                style={{
                    data: {
                        fill: graphColors.red,
                        opacity: 0.3
                    }
                }}
                data={minRangeArea}
            />
            <VictoryLine
                style={{
                    data: {
                        stroke: graphColors.red
                    }
                }}
                data={minLineRange}
            />
            <VictoryScatter
                style={{ data: { fill: color } }}
                size={5}
                data={data}
            />
        </VictoryChart>
    </View>
}