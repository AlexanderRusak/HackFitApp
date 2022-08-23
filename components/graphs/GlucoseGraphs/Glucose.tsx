import React from "react"
import { View, Text } from "react-native"
import { VictoryArea, VictoryBar, VictoryChart, VictoryLine, VictoryScatter, VictoryStack } from "victory-native"
import { GraphMain } from "../../../constants/interfaces/GraphMain"
import { graphColors } from "../../../styles/theme"
import { GraphArea } from "../../ui/Graph/GraphArea"
import { GraphLine } from "../../ui/Graph/GraphLine"


interface Glucose extends GraphMain { }


export const GlucoseGraph = ({ color }: Glucose) => {

    const data = [
        { x: 1, y: 200 },
        { x: 2, y: 210 },
        { x: 3, y: 180 },
        { x: 4, y: 160 },
        { x: 5, y: 70 }
    ]


    return <View>
        <Text style={{ color: color }}>Glucose Graph</Text>
        <VictoryChart

        >
         {/*    <GraphArea
                data={data}
                color={graphColors.yellow}
                fillOpacity={30}
                maxValue={230}
                minValue={200}
            />
            <GraphLine
                color={graphColors.yellow}
                data={data}
                value={200}
            /> */}
            <VictoryArea
                style={{
                    data: {
                        fill: "#cccc"
                    }
                }}
                data={[
                    { x: 0, y: 200, y0: 80 },
                    { x: 1, y: 200, y0: 80 },
                    { x: 2, y: 200, y0: 80 },
                    { x: 3, y: 200, y0: 80 },
                    { x: 4, y: 200, y0: 80 },
                    { x: 5, y: 200, y0: 80 }
                ]}
            />
            <VictoryLine
                style={{
                    data: {
                        stroke: "rgba(2230,221,138,1)"
                    }
                }}
                data={[
                    { x: 0, y: 200 },
                    { x: 1, y: 200 },
                    { x: 2, y: 200 },
                    { x: 3, y: 200 },
                    { x: 4, y: 200 },
                    { x: 5, y: 200 }
                ]}
            />



            <VictoryArea
                style={{
                    data: {
                        fill: "#c43a3160"
                    }
                }}
                data={[
                    { x: 0, y: 80, y0: 0 },
                    { x: 1, y: 80, y0: 0 },
                    { x: 2, y: 80, y0: 0 },
                    { x: 3, y: 80, y0: 0 },
                    { x: 4, y: 80, y0: 0 },
                    { x: 5, y: 80, y0: 0 }
                ]}
            />
            <VictoryLine
                style={{
                    data: {
                        stroke: "#c43a31"
                    }
                }}
                data={[
                    { x: 0, y: 80 },
                    { x: 1, y: 80 },
                    { x: 2, y: 80 },
                    { x: 3, y: 80 },
                    { x: 4, y: 80 },
                    { x: 5, y: 80 }
                ]}
            />
            <VictoryScatter
                style={{ data: { fill: color } }}
                size={5}
                data={data}
            />
        </VictoryChart>
    </View>
}