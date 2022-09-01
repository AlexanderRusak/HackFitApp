import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { VictoryArea, VictoryChart, VictoryPie } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"
import { IStore } from "../../store"
import { getFormattedDate } from "../ui/Graph/helpers"
import { HeaderComponent } from "./GraphsComponent/HeaderComponent"


interface CaloriesGraphProps extends GraphMain { }


export const CaloriesGraph = ({ }: CaloriesGraphProps) => {

    const { energy, color } = useSelector((store: IStore) => store.settingsParameter);

    const { hours, minutes, day, month, year, formattedTime } = getFormattedDate(new Date());

    const initData = [
        {
            x: new Date(year, month, day, hours, minutes), y: {
                dailyCaloriesLimit: 3000,
                proteins: 200,
                carbs: 100,
                fats: 150,
            }
        },
    ]

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


    return <View>
        <HeaderComponent
            currentValue={3000}
            headerTitle={'Calories Graph'}
            measuringUnit={energy}
        />
        <View>
            <VictoryChart>
                <VictoryArea

                />
            </VictoryChart>
            <VictoryPie
                data={data}
                height={300}
                colorScale={["pink", "navy", "orange",]}
                labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                labelRadius={25}
                labelPlacement={() => 'parallel'}
                padAngle={() => 1}
                style={{
                    labels: {
                        fill: 'white',
                        fontSize: 16,
                        fontWeight: "bold"
                    }
                }}
            />
        </View>

    </View>
}