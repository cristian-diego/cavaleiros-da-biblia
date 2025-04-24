import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check, CheckCircle } from 'lucide-react-native';
import { Mission } from '@/types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';

interface MissionItemProps {
  mission: Mission;
  onComplete: (id: string) => void;
  disabled?: boolean;
}

const MissionItem: React.FC<MissionItemProps> = ({ mission, onComplete, disabled = false }) => {
  const animatedValue = useSharedValue(mission.completed ? 1 : 0);

  const handleComplete = () => {
    if (disabled || mission.completed) return;

    onComplete(mission.id);
    animatedValue.value = withSpring(1, { damping: 15 });
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animatedValue.value, [0, 1], ['#FFFFFF', '#F5F1EB']),
    };
  });

  const animatedCheckStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(animatedValue.value * 1 + 1) }],
      opacity: withSpring(animatedValue.value),
    };
  });

  const getAttributeClasses = () => {
    switch (mission.attribute) {
      case 'faith':
        return 'bg-[#E6E8F3] text-[#2C3E85]';
      case 'boldness':
        return 'bg-[#ECEEE9] text-[#6B784D]';
      case 'wisdom':
        return 'bg-[#F5EBBC] text-[#A6912F]';
      default:
        return '';
    }
  };

  return (
    <Animated.View
      className="shadow-offset-[0px/2px] shadow-opacity-10 shadow-radius-3 elevation-2 mb-3 flex-row rounded-xl bg-white p-4 shadow-sm shadow-black"
      style={animatedContainerStyle}>
      <View className="mr-3 flex-1">
        <View className="mb-1.5 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-[#2C3E85]">{mission.title}</Text>
          <Text className="text-sm font-semibold text-[#CFB53B]">+{mission.xpReward} XP</Text>
        </View>

        <Text className="mb-2 text-sm text-[#565B49]">{mission.description}</Text>

        <View className="flex-row items-center">
          <Text className="mr-1 text-xs text-[#8B877D]">Atributo:</Text>
          <Text className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${getAttributeClasses()}`}>
            {mission.attribute === 'faith' && 'Fé'}
            {mission.attribute === 'boldness' && 'Coragem'}
            {mission.attribute === 'wisdom' && 'Sabedoria'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className={`h-10 w-10 items-center justify-center rounded-xl border-2 border-[#8F9779] ${
          mission.completed ? 'border-[#8F9779] bg-[#ECEEE9]' : ''
        } ${disabled ? 'opacity-50' : ''}`}
        onPress={handleComplete}
        disabled={disabled || mission.completed}
        activeOpacity={0.7}>
        {mission.completed ? (
          <Animated.View style={animatedCheckStyle}>
            <CheckCircle color="#8F9779" size={28} />
          </Animated.View>
        ) : (
          <Check color="#8F9779" size={24} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MissionItem;
