import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native"
import { GraphMain } from "../../constants/interfaces/GraphMain"
import { Button } from "../ui/Button/Button"

interface SaturationGraphProps extends GraphMain {

}


export const SaturationGraph = ({ color }: SaturationGraphProps) => {

    const initData = [
        { x: '09.54', y: 97.5 },
        { x: '09.59', y: 97 },
        { x: '10.20', y: 96.5 },
        { x: '10.34', y: 96 },
        { x: '11.02', y: 98 },
        { x: '11.15', y: 97.5 },
        { x: '11.44', y: 97 },
        { x: '11.58', y: 96.5 },
        { x: '12.02', y: 96.5 },
        { x: '12.20', y: 97 },
        { x: '12.31', y: 98 },
        { x: '12.55', y: 95.5 },
        { x: '13.18', y: 96 },
        { x: '13.54', y: 98 },
        { x: '13.55', y: 95.5 },
        { x: '14.15', y: 97 },
        { x: '14.40', y: 96 },
        { x: '15.00', y: 97 }
    ];

    const [currentRange, setCurrentRange] = useState(5);
    const [saturationData, setSaturationData] = useState(initData.slice(initData.length - currentRange));



    useEffect(() => {
        setSaturationData(initData.slice(initData.length - currentRange))
    }, [currentRange])





    const handleDecreaseRange = useCallback(() => {
        setCurrentRange(currentRange - 1);
    }, [currentRange]);

    const handleIncreaseRange = useCallback(() => {
        setCurrentRange(currentRange + 1);

    }, [currentRange]);

    useEffect(() => { 
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            setSaturationData([...initData, { x: '15.55', y: 97.5 }].slice(initData.length - currentRange+ 1 ))
        }, 5000)

        return () => clearInterval(intervalId); //This is important

    }, [setCurrentRange])



    return <View>
        <Text style={{ color: color }}>Saturation Graph</Text>
        <View style={styles.buttonsContainer}>
            <View style={styles.buttons}>
                <Button
                    isDisabled={currentRange <= 5}
                    title="-"
                    handlePress={handleDecreaseRange}
                />
            </View>
            <View style={styles.buttons}>
                <Button
                    isDisabled={initData.length <= currentRange}
                    title="+"
                    handlePress={handleIncreaseRange}
                />
            </View>
        </View>
        <Text style={{ color: color }}>Current value {initData[initData.length - 1].y}</Text>
        <VictoryChart
            maxDomain={{
                y: 99,
            }}
            minDomain={{
                y: 94
            }}
            height={500}
            animate={{
                duration: 500,
                onLoad: { duration: 500 }
            }}
            theme={VictoryTheme.material}
        >
            <VictoryLine

                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={saturationData}
                interpolation="natural"

            />
        </VictoryChart>
    </View>
}

const styles = StyleSheet.create({
    buttonsContainer: {
        width: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        width: 50
    }
})