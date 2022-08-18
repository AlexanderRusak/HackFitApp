import React from "react"
import { View, Text } from "react-native"
import { VictoryPie } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"


interface CaloriesGraphProps extends GraphMain { }


export const CaloriesGraph = ({ color }: CaloriesGraphProps) => {

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
        <Text style={{ color: color }}>Calories Graph</Text>
        <VictoryPie
            data={data}
            height={500}
            colorScale={["pink", "navy", "orange",]}
            labels={({ datum }) => `${datum.x}: ${datum.y}%`}
            labelRadius={25}
            labelPlacement={()=>'parallel'}
            padAngle={()=>1}
            style={{
                labels:{
                    fill:'white',
                    fontSize: 16, 
                    fontWeight: "bold"
                }
            }}
        />
    </View>
}