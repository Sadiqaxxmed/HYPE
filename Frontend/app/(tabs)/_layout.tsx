import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'dark'].tabIconDefault,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: '',
          // headerShown: false,
          headerStyle: {
            height: '6%',
            backgroundColor: '#000',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home-outline"
              size={25}
              color={focused ? Colors[colorScheme ?? 'dark'].tabIconSelected : Colors[colorScheme ?? 'dark'].tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="flash-outline"
              size={25}
              color={focused ? Colors[colorScheme ?? 'dark'].tabIconSelected : Colors[colorScheme ?? 'dark'].tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="duplicate-outline"
              size={25}
              color={focused ? Colors[colorScheme ?? 'dark'].tabIconSelected : Colors[colorScheme ?? 'dark'].tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person-outline"
              size={25}
              color={focused ? Colors[colorScheme ?? 'dark'].tabIconSelected : Colors[colorScheme ?? 'dark'].tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
