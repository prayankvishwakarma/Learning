import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {TextButton, CategoryCard} from '../../components';
import {COLORS, SIZES, FONTS, icons, dummyData} from '../../constants';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SimultaneousGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
const Search = () => {
  const scrollViewRef = React.useRef();

  function renderTopSearches() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}>
          Top Searches
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          marginTop: 100,
          paddingBottom: 300,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDimisssMode="on-drag"
        //onScroll
        //onScrollEndDrag
      >
        {/* Top Searches */}
        {renderTopSearches()}
      </Animated.ScrollView>
    </View>
  );
};

export default Search;
