import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"


interface Glucose extends GraphMain { }


export const GlucoseGraph = ({color}:Glucose) => {


    return <View>
        <Text  style={{color:color}}>Glucose Graph</Text>
        <VictoryBar />
    </View>
}