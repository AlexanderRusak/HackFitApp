import React from "react"
import { View, Text } from "react-native"
import { VictoryBar } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"


interface HeartrateGraphProps extends GraphMain { }


export const HeartrateGraph = ({ color }: HeartrateGraphProps) => {


    return <View>
        <Text  style={{color:color}}>Heart Rate Graph</Text>
        <VictoryBar />
    </View>
}