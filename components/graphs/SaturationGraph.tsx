import React from "react"
import { View, Text } from "react-native"
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"



interface SaturationGraphProps extends GraphMain {

}


export const SaturationGraph = ({ color }: SaturationGraphProps) => {


    return <View>
        <Text style={{ color: color }}>Saturation Graph</Text>
        <VictoryChart
            theme={VictoryTheme.material}
        >
            <VictoryLine
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 }
                ]}
            />
        </VictoryChart>
    </View>
}