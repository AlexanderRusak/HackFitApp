import React, { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ThemeContext } from "../../../context/ThemeContext";
import { theme } from "../../../styles/theme";

interface HeaderComponentProps {
    headerTitle: string;
    currentValue: number | string;
    measuringUnit: string;
    lastMeasure?: string;

}

export const HeaderComponent = ({ headerTitle, currentValue, measuringUnit, lastMeasure }: HeaderComponentProps) => {

    const { themeColor } = useContext(ThemeContext);

    return <>
        <Text style={{ ...styles.header, color: themeColor }}>{headerTitle}</Text>
        <View style={styles.infoContainer}>
            <Text style={{ ...styles.info, color: themeColor }}>Current: {currentValue} {measuringUnit}</Text>
            {lastMeasure ? <Text style={{ ...styles.lastMeasure, color: themeColor }}>Last measuring time: {lastMeasure}</Text> : null}
        </View>
    </>
};

const styles = StyleSheet.create({
    header: {
        fontSize: theme.mainFontSize,
        alignSelf: 'center'
    },
    infoContainer: {
        marginTop: 30,
        display: 'flex',
        alignSelf: 'flex-start',
        paddingLeft: theme.padding
    },
    info: {
        fontSize: 30
    },
    lastMeasure: {
        fontSize: 15
    }
});