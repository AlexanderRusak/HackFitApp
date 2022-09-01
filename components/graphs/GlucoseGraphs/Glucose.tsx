import React, { useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { VictoryArea, VictoryAxis, VictoryBar, VictoryBrushContainer, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter, VictoryTheme, VictoryZoomContainer, } from "victory-native"
import { GraphMain } from "../../../constants/interfaces/GraphMain"
import { IStore } from "../../../store"
import { graphColors, theme } from "../../../styles/theme";
import { DomainTuple } from "victory-core";
import { addZero, getAreaData, getFormattedDate, getLineData } from "../../ui/Graph/helpers"
import { BrushComponent } from "../GraphsComponent/BrushComponent"
import { HeaderComponent } from "../GraphsComponent/HeaderComponent"


interface Glucose extends GraphMain { }



export interface BrushDomain {
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

    const initialZoom = useMemo(() => [...data].splice(-5), [data]);
    const initialDomain: BrushDomain = { x: [initialZoom[0].x, initialZoom[initialZoom.length - 1].x] }

    const [zoomDomain, setZoomDomain] = useState<BrushDomain | DomainTuple>(initialDomain);
    const [selectedDomain, setSelectedDomain] = useState<BrushDomain | DomainTuple>(initialDomain);

    const handleZoom = (selectedDomain: BrushDomain) => {
        setSelectedDomain(selectedDomain);
    }

    const handleBrush = (zoomDomain: BrushDomain) => {
        setZoomDomain(zoomDomain);
    }

    return <View style={styles.container}>
        <HeaderComponent
        currentValue={data[data.length - 1].y}
        headerTitle={'Glucose Graph'}
        lastMeasure={formattedTime}
        measuringUnit={'g/mmol'}
        />

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
                domainPadding={{
                    x: 15
                }}
            />
        </VictoryChart>
        <BrushComponent
            data={data}
            color={color}
            rangeX={[maxRangeArea[0].x, maxRangeArea[maxRangeArea.length - 1].x]}
            rangeY={[0, 250]}
            brushDomain={selectedDomain as BrushDomain}
            onBrushDomainChange={handleBrush}
            interpolationType='step'
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        padding: theme.padding,
        alignItems: 'center'
    },
})