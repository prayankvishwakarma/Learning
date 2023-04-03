import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES, dummyData, icons} from '../../../constants';
import {IconButton} from '../../../components';

const CourseFiles = () => {
  function renderFiles() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        {/* Section Title */}
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.h2,
            fontSize: 25,
          }}>
          Files
        </Text>

        {/* Files  */}
        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <View
              key={`Files-${index}`}
              style={{
                flexDirection: 'row',
                marginTop: SIZES.radius,
              }}>
              {/* thumbnail */}
              <Image
                source={item?.thumbnail}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              {/* Name, Author and DAte */}
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.h2,
                  }}>
                  {item?.name}
                </Text>

                <Text
                  style={{
                    color: COLORS.gray30,
                    ...FONTS.body3,
                  }}>
                  {item?.author}
                </Text>
                <Text
                  style={{
                    color: COLORS.gray60,
                    ...FONTS.body4,
                  }}>
                  {item?.upload_date}
                </Text>
              </View>

              {/* Menu */}
              <IconButton
                icon={icons.menu}
                iconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.black,
                }}
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        padding: SIZES.padding,
      }}>
      {/* Files */}
      {renderFiles()}
    </ScrollView>
  );
};

export default CourseFiles;
