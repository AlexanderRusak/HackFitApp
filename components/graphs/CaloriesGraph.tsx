import React, { useMemo, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLine, VictoryPie, VictoryTheme, VictoryZoomContainer } from "victory-native"
import { Calories, GraphMain } from "../../constants/interfaces/GraphMain"
import { IStore } from "../../store"
import { theme } from "../../styles/theme"
import { getCaloriesAreaData, getFormattedDate, getLineData, getPieData, getSingleLineData, PieDataType } from "../ui/Graph/helpers"
import { BrushDomain } from "./GlucoseGraphs/Glucose"
import { BrushComponent } from "./GraphsComponent/BrushComponent"
import { HeaderComponent } from "./GraphsComponent/HeaderComponent"
import { DomainTuple } from "victory-core";
import { converceNutritionToCalories } from "../../logic/measure/measure.helper"

interface CaloriesGraphProps extends GraphMain { }


export const CaloriesGraph = ({ }: CaloriesGraphProps) => {

    const { energy, color } = useSelector((store: IStore) => store.settingsParameter);

    const { hours, minutes, day, month, year, formattedTime } = getFormattedDate(new Date());


    const [zoomDomain, setZoomDomain] = useState<BrushDomain | DomainTuple>({} as BrushDomain);
    const [selectedDomain, setSelectedDomain] = useState<BrushDomain | DomainTuple>({} as BrushDomain);




    const handleZoom = (selectedDomain: BrushDomain) => {
        setSelectedDomain(selectedDomain);
    }

    const handleBrush = (zoomDomain: BrushDomain) => {
        setZoomDomain(zoomDomain);
    }

    const initData: Calories[] = [
        {
            x: new Date(year, month, day - 5),
            y: {
                dailyCaloriesLimit: 3000,
                carbs: 90,
                fats: 150,
                prots: 200,
            }
        },
        {
            x: new Date(year, month, day - 4),
            y: {
                dailyCaloriesLimit: 3000,
                carbs: 110,
                fats: 180,
                prots: 220,
            }
        },
        {
            x: new Date(year, month, day - 3),
            y: {
                dailyCaloriesLimit: 3000,
                carbs: 120,
                fats: 170,
                prots: 290,
            }
        },
        {
            x: new Date(year, month, day - 2),
            y: {
                dailyCaloriesLimit: 3000,
                carbs: 50,
                fats: 200,
                prots: 150,
            }
        },
        {
            x: new Date(year, month, day - 1),
            y: {
                dailyCaloriesLimit: 3000,
                carbs: 150,
                fats: 160,
                prots: 190,
            }
        },
        {
            x: new Date(year, month, day),
            y: {
                dailyCaloriesLimit: 3000,
                carbs: 90,
                fats: 180,
                prots: 210,
            }
        },
    ]

    const [carbs, fats, prots] = useMemo(() => getCaloriesAreaData({ array: initData }), [initData]);
    const pieData: PieDataType = useMemo(() => getPieData(initData, 1), [initData]);

    const lineData = useMemo(() => getSingleLineData(initData, 6), [initData]);
    console.log(lineData);


    return <View style={styles.container}>
        <HeaderComponent
            currentValue={initData[initData.length - 1].y.dailyCaloriesLimit}
            headerTitle={'Calories Graph'}
            measuringUnit={energy}
        />
        <View style={styles.graphsContainer}>
            <VictoryChart
                domain={{
                    y: [0, 3300]
                }}
                height={250}
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
                <VictoryArea
                    data={carbs}
                    interpolation={'stepBefore'}
                    style={{
                        data: {
                            fill: 'navy'
                        }
                    }}
                />
                <VictoryArea
                    interpolation={'stepBefore'}
                    data={fats}
                    style={{
                        data: {
                            fill: 'orange'
                        }
                    }}
                />
                <VictoryArea
                    labels={({datum}) => datum.y}
                    interpolation={'stepBefore'}
                    data={prots}
                    style={{
                        data: {
                            fill: 'pink',
                        },
                        labels:{
                            alignSelf:'center'
                        }
                    }}
                />
                <VictoryLine
                    data={lineData}
                    style={{ data: { stroke: color }, }}

                />
            </VictoryChart>
            <View style={styles.pieContainer}>
                <VictoryPie
                    height={250}
                    width={250}
                    data={pieData}
                    colorScale={["navy", "orange", "pink",]}
                    labels={({ datum }) => `${datum.y}%`}
                    labelRadius={15}
                    labelPlacement={() => 'parallel'}
                    padAngle={() => 1}
                    style={{
                        labels: {
                            fill: 'white',
                            fontSize: 16,
                            fontWeight: "bold"
                        },
                    }}
                />
                <View>
                    <Text>Carbs: {pieData[0].y}%</Text>
                    <Text>Fats: {pieData[1].y}%</Text>
                    <Text>Prots: {pieData[2].y}%</Text>
                </View>
            </View>
        </View>
        {/*         <BrushComponent
            data={data}
            color={color}
            rangeX={[+new Date(year, month, day, hours, minutes - 20), +new Date(year, month, day, hours, minutes - 20)]}
            rangeY={[0, 3000]}
            brushDomain={selectedDomain as BrushDomain}
            onBrushDomainChange={handleBrush}
            interpolationType='step'
        /> */}
    </View>
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        padding: theme.padding,
        alignItems: 'center'
    },
    graphsContainer: {
        display: 'flex',
    },
    pieContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '35%',
        backgroundColor: 'red'
    }
})