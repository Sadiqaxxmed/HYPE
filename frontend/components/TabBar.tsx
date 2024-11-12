import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent, useColorScheme } from 'react-native';
import {  useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {

  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? Colors.light.background : Colors.dark.darkGrey;
  const [dimensions, setDimensions] = useState({height: 20, width: 100});
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() =>  {
    return {
      transform: [{translateX: tabPositionX.value}]
    }
  })

  return (
    <View onLayout={onTabbarLayout} style={[styles.tabbar, { backgroundColor: themeContainerStyle }]}  >
      <Animated.View style={[animatedStyle, {
        position: 'absolute',
        backgroundColor: Colors.dark.hypeColor,
        borderRadius: 30,
        marginHorizontal: 12,
        height: dimensions.height - 15,
        width: buttonWidth - 25
      }]} 
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#fff' : Colors.dark.lightGrey}
            label={label}
           />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1
  },
})

