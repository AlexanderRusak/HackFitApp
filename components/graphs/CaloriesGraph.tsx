import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"


interface CaloriesGraphProps extends GraphMain { }


export const CaloriesGraph = ({color}:CaloriesGraphProps) => {


    return <View>
        <Text  style={{color:color}}>Calories Graph</Text>
        <VictoryBar />
    </View>
}