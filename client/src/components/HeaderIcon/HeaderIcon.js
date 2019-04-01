import React from 'react';
import {View} from 'react-native';
import {Icon} from 'expo';
import {colors} from 'constants/appConfig';

const HeaderIcon = ({name, ...rest}) => {
  return (
    <View>
      <Icon.Ionicons
        name={name}
        color={colors.BColor}
        size={30}
        style={{padding: 15}}
        {...rest}
      />
    </View>
  );
};

export default HeaderIcon;
