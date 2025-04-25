import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Heart, Shield, Book } from 'lucide-react-native';
import ProgressBar from './ProgressBar';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  FadeInRight,
} from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

interface AttributeBarProps {
  name: string;
  value: number;
  maxValue?: number;
  color?: string;
  type?: 'faith' | 'boldness' | 'wisdom';
  delay?: number;
}

const AttributeBar: React.FC<AttributeBarProps> = ({
  name,
  value,
  maxValue = 10,
  color,
  type = 'faith',
  delay = 0,
}) => {
  const progress = useSharedValue(0);

  const attributeColor = useMemo(() => {
    switch (type) {
      case 'faith':
        return '#FF6B6B';
      case 'boldness':
        return '#4ECDC4';
      case 'wisdom':
        return '#FFD700';
      default:
        return color || '#FFD700';
    }
  }, [type, color]);

  useEffect(() => {
    progress.value = withDelay(delay, withSequence(withSpring(value / maxValue, { damping: 12 })));
  }, [value, maxValue, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: color || attributeColor,
    height: '100%',
    borderRadius: 6,
  }));

  const getAttributeIcon = () => {
    switch (type) {
      case 'faith':
        return <Heart size={20} color="#FF6B6B" />;
      case 'boldness':
        return <Shield size={20} color="#4ECDC4" />;
      case 'wisdom':
        return <Book size={20} color="#FFD700" />;
      default:
        return null;
    }
  };

  const getAttributeBackground = () => {
    switch (type) {
      case 'faith':
        return 'bg-red-50';
      case 'boldness':
        return 'bg-teal-50';
      case 'wisdom':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Animated.View className="my-2 w-full" entering={FadeInRight.delay(200).springify()}>
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className={`mr-2 rounded-full p-2 ${getAttributeBackground()}`}>
            {getAttributeIcon()}
          </View>
          <Text className="text-kid-base font-bold text-gray-700">{name}</Text>
        </View>
        <View className="rounded-full bg-gray-100 px-3 py-1">
          <Text className="text-kid-sm font-bold text-gray-600">
            {value}/{maxValue}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 12,
          backgroundColor: '#E5E7EB',
          borderRadius: 6,
          overflow: 'hidden',
        }}>
        <Animated.View style={animatedStyle} />
      </View>
    </Animated.View>
  );
};

export default AttributeBar;
