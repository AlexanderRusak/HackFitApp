import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"

interface WeighGraphProps extends GraphMain{
    
}



export const WeighGraph = ({ color }: WeighGraphProps) => {
    console.log(color);
    
    return <View>
        <Text style={{ color: color }}>Weigh Graph</Text>
        <VictoryBar />
    </View>
}