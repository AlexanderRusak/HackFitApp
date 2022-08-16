import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"


interface StepsGraph extends GraphMain { }


export const StepsGraph = ({color }: StepsGraph) => {


    return <View>
        <Text  style={{color:color}}>Steps Graph</Text>
        <VictoryBar />
    </View>
}