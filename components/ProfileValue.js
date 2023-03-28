import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../constants';

const ProfileValue = ({icon, label, value, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
      onPress={onPress}>
      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: COLORS.additionalColor11,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
          }}
        />
      </View>
      {/* Label and Value */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        {label && (
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.body3,
            }}>
            {label}
          </Text>
        )}
        <Text
          style={{
            color: COLORS.gray50,
            ...FONTS.h3,
          }}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ProfileValue;
