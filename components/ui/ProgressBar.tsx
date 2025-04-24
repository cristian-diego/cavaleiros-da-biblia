import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 12,
  color = '#CFB53B',
  backgroundColor = '#E0D7C2',
  style,
}) => {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    animatedWidth.value = withTiming(clampedProgress, {
      duration: 700,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress, animatedWidth]);

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  return (
    <View className="w-full overflow-hidden rounded" style={[{ height, backgroundColor }, style]}>
      <Animated.View className="h-full rounded" style={[{ backgroundColor: color }, widthStyle]} />
    </View>
  );
};

export default ProgressBar;
