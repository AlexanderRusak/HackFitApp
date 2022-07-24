import React from "react";
import { ColorValue } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { theme } from "../../../styles/theme";

interface IconProps {
    iconName: string,
    size?: number,
    color?: number | ColorValue,
    styles?: any
}

export const Icon = ({ styles, size, iconName, color }: IconProps) => {
    FontAwesomeIcon.loadFont()
    return <FontAwesomeIcon style={styles} color={color ?? theme.colors.WHITE} size={size ?? theme.mainFontSize} name={iconName} />
}