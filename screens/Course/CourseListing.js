import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {
  IconButton,
  HorizontalCourseCard,
  LineDivider,
  FilterModal,
} from '../../components';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';
import {SharedElement} from 'react-navigation-shared-element';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 250;

const CourseListing = ({navigation, route, appTheme}) => {
  const {category, sharedElementPrefix} = route.params;

  const flatlistRef = React.useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerSharedValue = useSharedValue(80);

  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

  //Handler

  function backHandler() {
    navigation.goBack();
  }

  // Render

  function renderHeader() {
    const inputRange = [0, HEADER_HEIGHT - 50];

    headerSharedValue.value = withDelay(
      500,
      withTiming(0, {
        duration: 500,
      }),
    );

    const headerFadeAnimationStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
      };
    });

    const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: headerSharedValue.value,
          },
        ],
      };
    });

    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [HEADER_HEIGHT, 120],
          Extrapolate.CLAMP,
        ),
      };
    });

    const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [0, 200],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });

    const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 130],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: 'hidden',
          },
          headerHeightAnimatedStyle,
        ]}>
        {/* Background Image */}

        <SharedElement
          id={`{sharedElementPrefix}-CategoryCard-Bg-${category.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>

        {/* Title */}

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -80,
              left: 0,
              right: 0,
            },
            headerShowOnScrollAnimatedStyle,
          ]}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            {category?.title}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 70,
              left: 30,
            },
            headerHideOnScrollAnimatedStyle,
          ]}>
          <SharedElement
            id={`{sharedElementPrefix}-CategoryCard-Title-${category.id}`}
            style={[StyleSheet.absoluteFillObject]}>
            <Text
              style={{
                position: 'absolute',
                color: COLORS.white,
                ...FONTS.h1,
              }}>
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>

        {/* Back Button */}

        <Animated.View style={headerFadeAnimationStyle}>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              position: 'absolute',
              top: 25,
              left: 20,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              if (scrollY.value > 0 && scrollY.value <= 200) {
                flatlistRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true,
                });
                setTimeout(() => {
                  headerSharedValue.value = withTiming(
                    80,
                    {duration: 500},
                    () => {
                      runOnJS(backHandler)();
                    },
                  );
                }, 100);
              } else {
                backHandler();
              }
            }}
          />
        </Animated.View>

        {/* Category Image */}

        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={[
            {
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerFadeAnimationStyle,
            headerTranslateAnimatedStyle,
            headerHideOnScrollAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  }

  function renderResults() {
    return (
      <AnimatedFlatlist
        ref={flatlistRef}
        data={dummyData.courses_list_2}
        keyExtractor={item => `Results-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 270,
              marginBottom: SIZES.base,
            }}>
            {/* Results */}

            <Text
              style={{
                flex: 1,
                ...FONTS.body3,
                color: COLORS.gray30,
              }}>
              5761 Results
            </Text>

            {/* Filter Button */}

            <IconButton
              icon={icons.filter}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              containerStyle={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                filterModalSharedValue1.value = withTiming(0, {
                  duration: 100,
                });

                filterModalSharedValue2.value = withDelay(
                  100,
                  withTiming(0, {
                    duration: 500,
                  }),
                );
              }}
            />
          </View>
        }
        renderItem={({item, index}) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index == 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() =>
              navigation.navigate('CourseDetails', {selectedCourse: item})
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <LineDivider
            lineStyle={{
              backgroundColor: COLORS.gray20,
            }}
          />
        )}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1,
      }}>
      {/* Results */}
      {renderResults()}

      {/* Header */}
      {renderHeader()}

      {/* Filter Modal */}
      <FilterModal
        filterModalSharedValue1={filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
      />
    </View>
  );
};

CourseListing.SharedElement = (route, otherRoute, showing) => {
  if (otherRoute.name === 'Dashboard') {
    const {category, SharedElementPrefix} = route.params;
    return [
      {
        id: `${SharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
      },
      {
        id: `${SharedElementPrefix}-CategoryCard-Title-${category?.id}`,
      },
    ];
  }
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseListing);
