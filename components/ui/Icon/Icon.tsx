import React from "react";
import { ColorValue } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { theme } from "../../../styles/theme";


export const Fonts = {
    FontAwesome,
    FontAwesome5,
    FontAwesome5Pro,
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    Octicons,
    Zocial,
    SimpleLineIcons
};

interface IconProps {
    iconFont: keyof typeof Fonts,
    iconName: string,
    size?: number,
    color?: number | ColorValue,
    styles?: any
};



export const Icon = ({ styles, size, iconName, iconFont, color }: IconProps) => {
    Fonts[iconFont].loadFont();
    const Component = Fonts[iconFont];
    return <Component style={styles} color={color ?? theme.colors.WHITE} size={size ?? theme.mainFontSize} name={iconName} />
}