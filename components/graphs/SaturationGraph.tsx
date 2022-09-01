import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"
import { Button } from "../ui/Button/Button"
import { addZero, getFormattedDate } from "../ui/Graph/helpers"
import { BrushComponent } from "./GraphsComponent/BrushComponent"
import { BrushDomain } from "./GlucoseGraphs/Glucose"
import { DomainTuple } from "victory-core";
import { HeaderComponent } from "./GraphsComponent/HeaderComponent"
interface SaturationGraphProps extends GraphMain {

}


export const SaturationGraph = ({ color }: SaturationGraphProps) => {

    const { hours, minutes, day, month, year, formattedTime } = useMemo(() => getFormattedDate(new Date()), []);

    const initData = [
        { x: new Date(year, month, day, hours, minutes - 85), y: 97.5 },
        { x: new Date(year, month, day, hours, minutes - 80), y: 97 },
        { x: new Date(year, month, day, hours, minutes - 75), y: 96.5 },
        { x: new Date(year, month, day, hours, minutes - 70), y: 96 },
        { x: new Date(year, month, day, hours, minutes - 65), y: 98 },
        { x: new Date(year, month, day, hours, minutes - 60), y: 97.5 },
        { x: new Date(year, month, day, hours, minutes - 55), y: 97 },
        { x: new Date(year, month, day, hours, minutes - 50), y: 96.5 },
        { x: new Date(year, month, day, hours, minutes - 45), y: 96.5 },
        { x: new Date(year, month, day, hours, minutes - 40), y: 97 },
        { x: new Date(year, month, day, hours, minutes - 35), y: 98 },
        { x: new Date(year, month, day, hours, minutes - 30), y: 95.5 },
        { x: new Date(year, month, day, hours, minutes - 25), y: 96 },
        { x: new Date(year, month, day, hours, minutes - 20), y: 98 },
        { x: new Date(year, month, day, hours, minutes - 15), y: 95.5 },
        { x: new Date(year, month, day, hours, minutes - 10), y: 97 },
        { x: new Date(year, month, day, hours, minutes - 5), y: 96 },
        { x: new Date(year, month, day, hours, minutes), y: 97.9 }
    ];


    const initialZoom = useMemo(() => [...initData].splice(-5), [initData]);
    const initialDomain: BrushDomain = { x: [initialZoom[0].x, initialZoom[initialZoom.length - 1].x] }

    const [zoomDomain, setZoomDomain] = useState<BrushDomain | DomainTuple>(initialDomain);
    const [selectedDomain, setSelectedDomain] = useState<BrushDomain | DomainTuple>(initialDomain);

    const handleZoom = (selectedDomain: BrushDomain) => {
        console.log(selectedDomain);

        setSelectedDomain(selectedDomain);
    }

    const handleBrush = (zoomDomain: BrushDomain) => {
        setZoomDomain(zoomDomain);
    }




    return <View>
        <HeaderComponent
            currentValue={initData[initData.length - 1].y}
            headerTitle={'Saturation Graph'}
            lastMeasure={formattedTime}
            measuringUnit={'%'}
        />

        <VictoryChart
            maxDomain={{
                y: 99,
            }}
            minDomain={{
                y: 94
            }}
            height={400}
            theme={VictoryTheme.material}
            scale={{
                x: 'time',
            }}
            
            containerComponent={<VictoryZoomContainer
                responsive={false}
                zoomDimension='x'
                zoomDomain={zoomDomain as BrushDomain}
                onZoomDomainChange={handleZoom}
            />
        }
        >
            <VictoryLine
                labels={({ datum }) => datum.y}
                style={{
                    data: { stroke: color },
                    parent: { border: "1px solid #ccc" }
                }}
                domainPadding={{
                    x: 20
                }}
                data={initData}
                interpolation="natural"

            />
            <VictoryAxis
                crossAxis
                tickFormat={(x) => addZero(new Date(x).getHours()) + ':' + addZero(new Date(x).getMinutes())}
            />
        </VictoryChart>

        <BrushComponent
            brushDomain={selectedDomain as BrushDomain}
            onBrushDomainChange={handleBrush}
            rangeX={[+initData[0].x, +initData[initData.length - 1].x]}
            rangeY={[94, 99]}
            data={initData}
            color={color}
            interpolationType={'natural'}
        />
    </View>
}

const styles = StyleSheet.create({

})