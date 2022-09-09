import React, { useMemo, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryPie, VictoryTheme, VictoryZoomContainer } from "victory-native"
import { Calories, GraphMain } from "../../constants/interfaces/GraphMain"
import { IStore } from "../../store"
import { caloriesGraphColors, graphColors, theme } from "../../styles/theme"
import { dayInMs, getCaloriesAreaData, getFormattedDate, getLineData, getPieData, getSingleLineData, PieDataType } from "../ui/Graph/helpers"
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
                dailyCaloriesLimit: 2700,
                carbs: 90,
                fats: 150,
                prots: 200,
            }
        },
        {
            x: new Date(year, month, day - 4),
            y: {
                dailyCaloriesLimit: 2700,
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
    const chartDomainDayPrev = +initData[0].x - dayInMs / 2;
    const chartDomainDayNext = +initData[initData.length - 1].x + dayInMs / 2;

    return <View style={styles.container}>
        <HeaderComponent
            currentValue={initData[initData.length - 1].y.dailyCaloriesLimit}
            headerTitle={'Calories Graph'}
            measuringUnit={energy}
        />
        <View style={styles.graphsContainer}>
            <VictoryChart
                domain={{
                    y: [0, 3600],
                    x: [chartDomainDayPrev, chartDomainDayNext]
                }}
                height={250}
                theme={VictoryTheme.material}
                scale={{
                    x: 'time',
                }}
                containerComponent={<VictoryZoomContainer
                    responsive={false}
                    zoomDimension='x'
                    zoomDomain={zoomDomain as BrushDomain}
                    onZoomDomainChange={handleZoom}
                />}

            >
                <VictoryLine
                    labelComponent={<VictoryLabel dy={-10} dx={({ data, index }: any) =>
                        +index === 0 ? 22 : data.length - 1 === +index ? -22 : 0} style={{
                            fill: ({ index, data }: any) => data[index].y > fats[index].y - fats[index].y0 + carbs[index].y - carbs[index].y0 + prots[index].y - prots[index].y0 ? color : graphColors.red,
                            fontSize: 16,
                        }} />}
                    labels={({ index }: any) => fats[index].y - fats[index].y0 + carbs[index].y - carbs[index].y0 + prots[index].y - prots[index].y0}
                    data={lineData}
                    style={{ data: { stroke: graphColors.red }, }}

                />
                <VictoryBar
                    barWidth={40}
                    labelComponent={<VictoryLabel dy={12} style={{
                        fill: color
                    }} />}
                    labels={({ datum }) => datum.y - datum.y0}
                    data={prots}
                    style={{
                        data: {
                            fill: caloriesGraphColors.PROTEIN,
                        },
                    }}
                />
                <VictoryBar
                    barWidth={40}
                    labelComponent={<VictoryLabel dy={12} style={{
                        fill: color
                    }} />}
                    labels={({ datum }) => datum.y - datum.y0}
                    data={fats}
                    style={{
                        data: {
                            fill: caloriesGraphColors.FAT
                        }
                    }}

                />
                <VictoryBar
                    barWidth={40}
                    labelComponent={<VictoryLabel dy={0} style={{
                        fill: color
                    }} />}
                    labels={({ datum }) => datum.y}
                    data={carbs}
                    style={{
                        data: {
                            fill: caloriesGraphColors.CARBOHYDRATES,

                        },
                    }}
                />
                <VictoryAxis
                    crossAxis
                />

            </VictoryChart>
            <View style={styles.pieContainer}>
                <View style={styles.pieGraph}>
                    <VictoryPie
                        width={250}
                        height={250}
                        data={pieData}
                        colorScale={[caloriesGraphColors.CARBOHYDRATES, caloriesGraphColors.FAT, caloriesGraphColors.PROTEIN,]}
                        labels={({ datum }) => `${datum.y}%`}
                        labelRadius={30}
                        labelPlacement={() => 'parallel'}
                        padAngle={() => 5}
                        innerRadius={20}
                        style={{
                            labels: {
                                fill: color,
                                fontSize: 16,
                            },
                        }}
                    />
                </View>
                <View style={styles.pieLegendContainer} >
                    <Text style={{ ...styles.pieLegendText, ...styles.pieCarbs }}>Carbs: {pieData[0].y}%</Text>
                    <Text style={{ ...styles.pieLegendText, ...styles.pieFats }}>Fats: {pieData[1].y}%</Text>
                    <Text style={{ ...styles.pieLegendText, ...styles.pieProts }}>Prots: {pieData[2].y}%</Text>
                </View>
            </View>
            <BrushComponent
                data={fats}
                color={color}
                rangeX={[chartDomainDayPrev, chartDomainDayNext]}
                rangeY={[0, 3000]}
                brushDomain={selectedDomain as BrushDomain}
                onBrushDomainChange={handleBrush}
                interpolationType='step'
            />
        </View>

    </View>
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        padding: theme.padding,
        alignItems: 'center',

    },
    graphsContainer: {
        display: 'flex',
        alignItems: 'center',

        
    },
    pieContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '83%',
        height: '30%',
    },
    pieLegendContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'space-evenly',


    },
    pieGraph: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
    },
    pieLegendText: {
        fontSize: 18,
        fontWeight: "500"
    },
    pieProts: {
        color: caloriesGraphColors.PROTEIN
    },
    pieCarbs: {
        color: caloriesGraphColors.CARBOHYDRATES
    },
    pieFats: {
        color: caloriesGraphColors.FAT
    }
})