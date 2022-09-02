import React, { useMemo, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { VictoryArea, VictoryChart, VictoryPie, VictoryTheme, VictoryZoomContainer } from "victory-native"
import { Calories, GraphMain } from "../../constants/interfaces/GraphMain"
import { IStore } from "../../store"
import { theme } from "../../styles/theme"
import { getCaloriesAreaData, getFormattedDate } from "../ui/Graph/helpers"
import { BrushDomain } from "./GlucoseGraphs/Glucose"
import { BrushComponent } from "./GraphsComponent/BrushComponent"
import { HeaderComponent } from "./GraphsComponent/HeaderComponent"
import { DomainTuple } from "victory-core";

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
                prots: 200,
                carbs: 90,
                fats: 150,
            }
        },
        {
            x: new Date(year, month, day - 4),
            y: {
                dailyCaloriesLimit: 3000,
                prots: 220,
                carbs: 110,
                fats: 180,
            }
        },
        {
            x: new Date(year, month, day - 3),
            y: {
                dailyCaloriesLimit: 3000,
                prots: 290,
                carbs: 120,
                fats: 170,
            }
        },
        {
            x: new Date(year, month, day - 2),
            y: {
                dailyCaloriesLimit: 3000,
                prots: 150,
                carbs: 50,
                fats: 200,
            }
        },
        {
            x: new Date(year, month, day - 1),
            y: {
                dailyCaloriesLimit: 3000,
                prots: 190,
                carbs: 150,
                fats: 160,
            }
        },
        {
            x: new Date(year, month, day),
            y: {
                dailyCaloriesLimit: 3000,
                prots: 210,
                carbs: 200,
                fats: 180,
            }
        },
    ]

    const [carbs, fats, prots] = useMemo(() => getCaloriesAreaData({ array: initData }), [initData]);
    console.log(carbs, fats, prots);


    const data =
        [
            {

                y: 40,
                x: "Proteins"
            },
            {

                y: 15,
                x: "Carbs"
            },
            {

                y: 45,
                x: "Fats"
            }
        ]


    return <View style={styles.container}>
        <HeaderComponent
            currentValue={3000}
            headerTitle={'Calories Graph'}
            measuringUnit={energy}
        />
        <View style={styles.graphsContainer}>
            <VictoryChart
            domain={{
                y:[0,3200]
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
                    style={{
                        data:{
                            fill:'navy'
                        }
                    }}
                />
                <VictoryArea
                    data={fats}
                    style={{
                        data:{
                            fill:'orange'
                        }
                    }}
                />
                <VictoryArea
                    data={prots}
                    style={{
                        data:{
                            fill:'pink'
                        }
                    }}
                />
            </VictoryChart>
            <View style={styles.pieContainer}>
                <VictoryPie
                    height={200}
                    width={200}
                    data={data}
                    colorScale={["pink", "navy", "orange",]}
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
                    <Text>1</Text>
                    <Text>2</Text>
                    <Text>3</Text>
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
        height: '30%',
        backgroundColor: 'red'
    }
})