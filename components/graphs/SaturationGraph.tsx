import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"



interface SaturationGraphProps extends GraphMain {

}


export const SaturationGraph = ({ color }: SaturationGraphProps) => {


    return <View>
        <Text style={{color:color}}>Saturation Graph</Text>
        <VictoryBar />
    </View>
}