import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"

interface WeightGraphProps extends GraphMain {

}



export const WeightGraph = ({ color }: WeightGraphProps) => {
    return <View>
        <Text style={{ color: color }}>Weight Graph</Text>
        <VictoryBar />
    </View>
}