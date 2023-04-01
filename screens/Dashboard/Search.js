import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {TextButton, CategoryCard} from '../../components';
import {COLORS, SIZES, FONTS, icons, dummyData} from '../../constants';
import {connect} from 'react-redux';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SimultaneousGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import {useNavigation} from '@react-navigation/native';

const Search = ({appTheme}) => {
  const navigation = useNavigation();

  const scrollViewRef = React.useRef();

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

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
            color: appTheme?.textColor,
          }}>
          Top Searches
        </Text>

        <FlatList
          horizontal
          data={dummyData.top_searches}
          listkey="TopSearches"
          keyExtractor={item => `TopSearches-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) => (
            <TextButton
              label={item.label}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.top_searches.length - 1
                    ? SIZES.padding
                    : 0,
                borderRadius: SIZES.radius,
                backgroundColor: appTheme?.buttonColor,
              }}
              labelStyle={{
                color: COLORS.gray50,
                ...FONTS.h3,
              }}
            />
          )}
        />
      </View>
    );
  }

  function renderBrowseCategories() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
            color: appTheme?.textColor,
          }}>
          Browse Categories
        </Text>

        <FlatList
          data={dummyData.categories}
          numColumns={2}
          scrollEnabled={false}
          listkey="BrowseCategories"
          keyExtractor={item => `BrowseCategories-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) => (
            <CategoryCard
              SharedElementPrefix="Search"
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
              }}
              onPress={() =>
                navigation.navigate('CourseListing', {
                  category: item,
                  SharedElementPrefix: 'Search',
                })
              }
            />
          )}
        />
      </View>
    );
  }

  function renderSearchBar() {
    const inputRange = [0, 55];
    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [55, 0],
          Extrapolate.CLAMP,
        ),
        opacity: interpolate(
          scrollY.value,
          inputRange,
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    });
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
            height: 50,
          },
          searchBarAnimatedStyle,
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width - SIZES.padding * 2,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: appTheme?.buttonColor,
          }}>
          <Image
            source={icons.search}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.gray40,
            }}
          />

          <TextInput
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              ...FONTS.h4,
            }}
            value=""
            placeholder="Search for Topics, Courses & Educators"
            placeholderTextColor={COLORS.gray50}
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1,
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
        onScroll={onScroll}
        onScrollEndDrag={event => {
          if (
            event.nativeEvent.contentOffset.y > 10 &&
            event.nativeEvent.contentOffset < 50
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true,
            });
          }
        }}>
        {/* Top Searches */}
        {renderTopSearches()}

        {/* Browse Categories */}
        {renderBrowseCategories()}
      </Animated.ScrollView>

      {/* Search Bar */}
      {renderSearchBar()}
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
