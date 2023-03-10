const Tabs = ({scrollX}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {/* Tabs */}
      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`BottomTab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            //onPress
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Text
              style={{
                marginTop: 3,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};




<Tabs scrollX={scrollX} />



function renderBottomTab(){
  return (
       <View
       style={{
         marginBottom:20,
         paddingHorizontal: SIZES.padding,
         paddingVertical: SIZES.radius
       }}
       >
         <Shadow
           size={[SIZES.width - (SIZES.padding*2), 85]}
         >
           <View
            style={{
               flex:1,
               borderRadius: SIZES.radius,
               backgroundColor: COLORS.black
            }}
           >

           </View>
         </Shadow>
       </View>
  )
}

