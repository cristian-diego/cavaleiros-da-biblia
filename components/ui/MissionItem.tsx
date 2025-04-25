import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Star, Award, Book, Heart, Shield } from 'lucide-react-native';
import { Mission } from '@/types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated';

interface MissionItemProps {
  mission: Mission;
  onComplete: (id: string) => void;
  disabled?: boolean;
}

const MissionItem: React.FC<MissionItemProps> = ({ mission, onComplete, disabled = false }) => {
  const scaleValue = useSharedValue(1);
  const completedValue = useSharedValue(mission.completed ? 1 : 0);
  const rotateValue = useSharedValue(0);

  const handleComplete = () => {
    if (disabled || mission.completed) return;

    // Animate the card when completing
    scaleValue.value = withSequence(withSpring(0.95), withSpring(1.05), withSpring(1));

    // Rotate the star
    rotateValue.value = withSequence(withSpring(1, { damping: 3 }), withDelay(300, withSpring(0)));

    completedValue.value = withSpring(1, { damping: 15 });
    onComplete(mission.id);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    backgroundColor: interpolateColor(completedValue.value, [0, 1], ['#FFFFFF', '#F0FFF4']),
  }));

  const animatedStarStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(completedValue.value * 0.3 + 1) },
      { rotate: `${rotateValue.value * 360}deg` },
    ],
  }));

  const getAttributeIcon = () => {
    switch (mission.attribute) {
      case 'faith':
        return <Heart size={16} color="#FF6B6B" />;
      case 'boldness':
        return <Shield size={16} color="#4ECDC4" />;
      case 'wisdom':
        return <Book size={16} color="#FFD93D" />;
      default:
        return null;
    }
  };

  const getAttributeStyle = () => {
    switch (mission.attribute) {
      case 'faith':
        return 'bg-red-50 text-red-500';
      case 'boldness':
        return 'bg-teal-50 text-teal-500';
      case 'wisdom':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return '';
    }
  };

  return (
    <Pressable onPress={handleComplete} disabled={disabled || mission.completed}>
      <Animated.View
        className="mb-4 rounded-kid-lg bg-white p-4 shadow-sm"
        style={animatedContainerStyle}>
        {/* Header */}
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="mb-1 text-kid-lg font-bold text-kid-blue">{mission.title}</Text>
          </View>
          <View className="flex-row items-center rounded-full bg-kid-yellow/10 px-3 py-1">
            <Star size={16} color="#FFD700" className="mr-1" />
            <Text className="font-bold text-kid-yellow">+{mission.xpReward}</Text>
          </View>
        </View>

        {/* Description */}
        <Text className="mb-3 text-kid-base text-gray-600">{mission.description}</Text>

        {/* Footer */}
        <View className="flex-row items-center justify-between">
          <View className={`flex-row items-center rounded-full px-3 py-1.5 ${getAttributeStyle()}`}>
            {getAttributeIcon()}
            <Text className={`ml-1.5 text-kid-sm font-semibold ${getAttributeStyle()}`}>
              {mission.attribute === 'faith' && 'Fé'}
              {mission.attribute === 'boldness' && 'Coragem'}
              {mission.attribute === 'wisdom' && 'Sabedoria'}
            </Text>
          </View>

          {/* Completion Status */}
          <Animated.View style={animatedStarStyle}>
            {mission.completed ? (
              <View className="rounded-full bg-kid-green/10 p-2">
                <Award size={24} color="#2ECC71" />
              </View>
            ) : (
              <View className="rounded-full bg-gray-100 p-2">
                <Star size={24} color="#CBD5E1" />
              </View>
            )}
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default MissionItem;
