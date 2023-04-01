import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {connect} from 'react-redux';
import {SharedElement} from 'react-native-shared-element';

const CategoryCard = ({
  category,
  containerStyle,
  appTheme,
  onPress,
  sharedElementPrefix,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 150,
        width: 200,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Image Background */}
      <SharedElement
        id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: SIZES.radius,
          }}
        />
      </SharedElement>

      {/* Title */}
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 15,
        }}>
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Text
            style={{
              position: 'absolute',
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
