import React from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false, 
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
