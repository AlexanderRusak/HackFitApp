import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { theme } from '../../styles/theme';
import { COLORS } from '../../settings/constants';
import { ThemeContext } from '../../context/ThemeContext';
import { Icon } from '../ui/Icon/Icon';

interface ISelectSection {
  title: string,
  dropDownArray: string[],
  defaultValue: string,
  handleSelect: (data: string, type: string) => void,
}

export const SelectSection = ({ title, defaultValue, dropDownArray, handleSelect }: ISelectSection) => {
  const { themeColor } = useContext(ThemeContext);

  const handleSelectHandler = useCallback((selectedItem: string) => {
    handleSelect(title === 'Color Schema' ? COLORS[selectedItem.replace(/\s+/g, '').toLowerCase() as 'burgundi' | 'veriperi'].value : selectedItem, title);
  }, [handleSelect]);

  return <View style={{ ...styles.container, borderColor: themeColor }}>
    <Text style={{ ...styles.sectionTitle, color: themeColor }}>{title}</Text>
    <SelectDropdown
      dropdownStyle={{
        backgroundColor: themeColor,
      }}
      buttonStyle={{
        backgroundColor: themeColor,
      }}
      buttonTextStyle={{
        color: theme.colors.WHITE,
        fontSize: theme.mainFontSize
      }}
      defaultButtonText={defaultValue}
      data={dropDownArray}
      onSelect={handleSelectHandler}
      rowTextStyle={{
        color: theme.colors.WHITE
      }}
      renderDropdownIcon={() => <Icon styles={styles.downIcon} iconFont='AntDesign' iconName='down' />}

    />
  </View>
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginHorizontal: '5%',
    borderBottomWidth: 1,

  },
  sectionTitle: {
    fontSize: theme.mainFontSize,
  },
  downIcon: {
    paddingRight: '5%'
  }
});