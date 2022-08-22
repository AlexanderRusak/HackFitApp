import React from "react"
import { View, Text } from "react-native"
import { VictoryArea, VictoryBar, VictoryChart, VictoryLine, VictoryScatter, VictoryStack } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"


interface Glucose extends GraphMain { }


export const GlucoseGraph = ({ color }: Glucose) => {


    return <View>
        <Text style={{ color: color }}>Glucose Graph</Text>
        <VictoryChart

        >
            <VictoryArea
                style={{
                    data: {
                        fill: "rgba(230,221,138,0.3)"
                    }
                }}
                data={[
                    { x: 0, y: 230, y0: 200 },
                    { x: 1, y: 230, y0: 200 },
                    { x: 2, y: 230, y0: 200 },
                    { x: 3, y: 230, y0: 200 },
                    { x: 4, y: 230, y0: 200 },
                    { x: 5, y: 230, y0: 200 }
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
                data={[
                    { x: 1, y: 200 },
                    { x: 2, y: 210 },
                    { x: 3, y: 180 },
                    { x: 4, y: 160 },
                    { x: 5, y: 70 }
                ]}
            />
        </VictoryChart>
    </View>
}