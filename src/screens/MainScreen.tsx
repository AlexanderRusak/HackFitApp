import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from 'react-redux'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { theme } from "../../styles/theme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Graphs, Settings, Summary, Workout } from "../../constants/screens/screens";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { IStore } from "../../store";
import { isPushToSetting } from "../../logic/helpers/helpers";
import { SummaryScreen } from "./SummaryScreen";
import { GraphsScreen } from "./GraphsScreen";
import { WorkoutScreen } from "./WorkoutScreen";
import { SettingsScreen } from "./SettingsScreen";



export const MainScreen = () => {

    const { themeColor } = useContext(ThemeContext);
    const { navigate } = useNavigation()

    const { data } = useSelector((store: IStore) => store.bodyParameters);
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(data, 'dssss');

        isPushToSetting(data.length ? data[0] : [], navigate)
    }, [isFocused])

    const BottomTabs = createMaterialBottomTabNavigator();

    const bottomTabsComponent = <BottomTabs.Navigator
        screenOptions={{
            tabBarColor: themeColor
        }}
    >
        <BottomTabs.Screen
            /*             options={{
                            tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={theme.colors.WHITE} />
                        }} */
            name={Summary} component={SummaryScreen} />
        <BottomTabs.Screen
            /*        options={{
                       tabBarIcon: ({ color }) => <SimpleLineIcons name="graph" size={24} color={theme.colors.WHITE} />
                   }} */
            name={Graphs} component={GraphsScreen} />
        <BottomTabs.Screen
            /*            options={{
                           tabBarIcon: ({ color }) => <FontAwesome5 name="running" size={24} color={theme.colors.WHITE} />
                       }} */
            name={Workout} component={WorkoutScreen} />
        <BottomTabs.Screen
            /*         options={{
                        tabBarIcon: ({ color }) => <Fontisto name="player-settings" size={24} color={theme.colors.WHITE} />
                    }} */
            name={Settings} component={SettingsScreen} />
    </BottomTabs.Navigator>


    return <View style={styles.mainScreen}>
        {bottomTabsComponent}
    </View>
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: '#ccc',
    },
});


