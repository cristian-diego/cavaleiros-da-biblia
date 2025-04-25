import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Award, BookOpen, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B6B', // Bright, playful red
        tabBarInactiveTintColor: '#4ECDC4', // Calm, friendly teal
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          fontFamily: 'System',
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: '#FFF5F5', padding: 8, borderRadius: 12 }}>
              <Home size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          title: 'Missões',
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: '#F0FFF4', padding: 8, borderRadius: 12 }}>
              <Award size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: 'Cartão',
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: '#F0F9FF', padding: 8, borderRadius: 12 }}>
              <BookOpen size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: '#FFF5F5', padding: 8, borderRadius: 12 }}>
              <User size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: '#F0F9FF', padding: 8, borderRadius: 12 }}>
              <User size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
