import React, { useCallback, useContext, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../styles/theme';
import { COLORS } from '../../settings/constants';
import { ThemeContext } from '../../context/ThemeContext';

interface ISelectSection {
  title: string,
  dropDownArray: string[],
  defaultValue: string,
  handleSelect: (data: string, type: string) => void,
}

export const SelectSection = ({ title, defaultValue, dropDownArray, handleSelect }: ISelectSection) => {
  Icon.loadFont()
  const { themeColor } = useContext(ThemeContext)

  const [selectedValueIndex, setSelectedValue] = useState(defaultValue ? dropDownArray.findIndex((item) =>
    item.toLowerCase() === defaultValue.toLowerCase()) : -1);

  const handleSelectHandler = useCallback((selectedItem: string) => {
    const valueIndex = dropDownArray.findIndex((item) => item.toLowerCase() === selectedItem.toLowerCase());
    setSelectedValue((valueIndex > -1) ? valueIndex : -1);

    handleSelect(title === 'Color Schema' ? COLORS[selectedItem.replace(/\s+/g, '').toLowerCase() as 'burgundi' | 'veriperi'].value : selectedItem.toLowerCase(), title);
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
      }}
      defaultValueByIndex={selectedValueIndex}
      data={dropDownArray}
      onSelect={handleSelectHandler}
      rowTextStyle={{
        color: theme.colors.WHITE
      }}
      renderDropdownIcon={() => <Icon style={styles.downIcon} name="angle-down" size={theme.mainFontSize} color={theme.colors.WHITE} />}

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