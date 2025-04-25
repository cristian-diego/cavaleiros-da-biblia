import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@/lib/theme/ThemeProvider';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <View className="flex-row gap-4 p-4">
      <Pressable
        onPress={() => setTheme('kid-bible')}
        className={`flex-1 rounded-lg p-4 ${theme === 'kid-bible' ? 'bg-primary' : 'bg-gray-200'}`}>
        <Text
          className={`text-center font-bold ${
            theme === 'kid-bible' ? 'text-white' : 'text-gray-700'
          }`}>
          Kid Bible
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setTheme('kid-adventurers')}
        className={`flex-1 rounded-lg p-4 ${
          theme === 'kid-adventurers' ? 'bg-primary' : 'bg-gray-200'
        }`}>
        <Text
          className={`text-center font-bold ${
            theme === 'kid-adventurers' ? 'text-white' : 'text-gray-700'
          }`}>
          Kid Adventurers
        </Text>
      </Pressable>
    </View>
  );
}
