import React, { useMemo, useState } from "react"
import { View, Text } from "react-native"
import { VictoryArea, VictoryAxis, VictoryBar, VictoryBrushContainer, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter, VictoryTheme, VictoryZoomContainer, } from "victory-native"
import { GraphMain } from "../../../constants/interfaces/GraphMain"
import { IStore } from "../../../store"
import { graphColors, theme } from "../../../styles/theme";
import { DomainTuple } from "victory-core";
import { addZero, getAreaData, getFormattedDate, getLineData } from "../../ui/Graph/helpers"


interface Glucose extends GraphMain { }

/* export interface DomainTuple {
    x: Date | number; y: number
}
 */
interface BrushDomain {
    x: DomainTuple
}

export const GlucoseGraph = ({ color }: Glucose) => {



    const { hours, minutes, day, month, year, formattedTime } = getFormattedDate(new Date());

    const data = [
        { x: new Date(year, month, day, hours, minutes - 20), y: 85 },
        { x: new Date(year, month, day, hours, minutes - 19), y: 78 },
        { x: new Date(year, month, day, hours, minutes - 18), y: 74 },
        { x: new Date(year, month, day, hours, minutes - 17), y: 114 },
        { x: new Date(year, month, day, hours, minutes - 16), y: 110 },
        { x: new Date(year, month, day, hours, minutes - 15), y: 115 },
        { x: new Date(year, month, day, hours, minutes - 14), y: 105 },
        { x: new Date(year, month, day, hours, minutes - 13), y: 100 },
        { x: new Date(year, month, day, hours, minutes - 12), y: 155 },
        { x: new Date(year, month, day, hours, minutes - 11), y: 150 },
        { x: new Date(year, month, day, hours, minutes - 10), y: 180 },
        { x: new Date(year, month, day, hours, minutes - 9), y: 176 },
        { x: new Date(year, month, day, hours, minutes - 8), y: 175 },
        { x: new Date(year, month, day, hours, minutes - 7), y: 170 },
        { x: new Date(year, month, day, hours, minutes - 6), y: 200 },
        { x: new Date(year, month, day, hours, minutes - 5), y: 65 },
        { x: new Date(year, month, day, hours, minutes - 4), y: 200 },
        { x: new Date(year, month, day, hours, minutes - 3), y: 210 },
        { x: new Date(year, month, day, hours, minutes - 2), y: 180 },
        { x: new Date(year, month, day, hours, minutes - 1), y: 160 },
        { x: new Date(year, month, day, hours, minutes), y: 70 },
    ];

    const maxRangeArea = useMemo(() => getAreaData({ array: data, maxValue: 250, minValue: 200 }), [data]);
    const minRangeArea = useMemo(() => getAreaData({ array: data, maxValue: 80, minValue: 0 }), [data]);
    const midRangeArea = useMemo(() => getAreaData({ array: data, maxValue: 200, minValue: 80 }), [data]);

    const initialZoom = [...data].splice(-5);
    const initialDomain: BrushDomain = { x: [initialZoom[0].x, initialZoom[initialZoom.length - 1].x] }

    const [zoomDomain, setZoomDomain] = useState<BrushDomain | DomainTuple>(initialDomain);
    const [selectedDomain, setSelectedDomain] = useState(initialDomain)

    const handleZoom = (selectedDomain: BrushDomain) => {
        setSelectedDomain(selectedDomain);
    }

    const handleBrush = (zoomDomain: BrushDomain) => {
        setZoomDomain(zoomDomain);
    }
    return <View>
        <Text style={{ color: color }}>Glucose Graph</Text>
        <Text>Current {data[data.length - 1].y} TIME: {formattedTime}</Text>


        <VictoryChart
            height={300}
            theme={VictoryTheme.material}
            scale={{
                x: 'time'
            }}
            containerComponent={<VictoryZoomContainer
                responsive={false}
                zoomDimension='x'
                zoomDomain={zoomDomain as BrushDomain}
                onZoomDomainChange={handleZoom}
            />}

        >
            <VictoryAxis
                crossAxis
                tickFormat={(x) => addZero(new Date(x).getHours()) + ':' + addZero(new Date(x).getMinutes())}
            />
            <VictoryArea
                style={{
                    data: {
                        fill: graphColors.yellow,
                        opacity: 0.6
                    }
                }}
                data={maxRangeArea}

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

            <VictoryScatter
                style={{ data: { fill: color } }}
                size={5}
                data={data}
                labels={({ datum }) => datum.y}
            />
        </VictoryChart>
        <VictoryChart
            theme={VictoryTheme.material}
            height={90}
            scale={{ x: 'time' }}
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            domain={{
                x: [maxRangeArea[0].x, maxRangeArea[maxRangeArea.length - 1].x],
                y: [0, 250]
            }}


            containerComponent={
                <VictoryBrushContainer
                    responsive={false}
                    brushDimension='x'
                    brushDomain={selectedDomain}
                    onBrushDomainChange={handleBrush}
                />
            }
        >
            <VictoryAxis
                crossAxis
                tickFormat={(x) => addZero(new Date(x).getHours()) + ':' + addZero(new Date(x).getMinutes())}
            />
            <VictoryLine
                interpolation={'step'}
                style={{ data: { fill: color } }}
                data={data} />

        </VictoryChart>
    </View>
}