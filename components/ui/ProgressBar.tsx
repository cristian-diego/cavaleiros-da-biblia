import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  showSparkle?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 12,
  color = '#FFD700',
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  style,
  showSparkle = true,
}) => {
  const animatedWidth = useSharedValue(0);
  const sparkleOpacity = useSharedValue(0);
  const sparkleScale = useSharedValue(1);

  useEffect(() => {
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    // Animate progress bar width with spring for bouncy effect
    animatedWidth.value = withSpring(clampedProgress, {
      damping: 15,
      stiffness: 80,
    });

    // Animate sparkle when progress changes
    if (showSparkle && progress > 0) {
      sparkleOpacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withRepeat(
          withSequence(withTiming(0.4, { duration: 1000 }), withTiming(1, { duration: 1000 })),
          -1,
          true
        )
      );

      sparkleScale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 1000 }), withTiming(1, { duration: 1000 })),
        -1,
        true
      );
    }
  }, [progress, showSparkle]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
    transform: [{ scale: sparkleScale.value }],
  }));

  return (
    <View className="relative w-full">
      {/* Background bar */}
      <View
        className="w-full overflow-hidden rounded-full"
        style={[{ height, backgroundColor }, style]}>
        {/* Progress bar with gradient overlay */}
        <Animated.View
          className="h-full rounded-full"
          style={[{ backgroundColor: color }, progressStyle]}>
          {/* Shine effect */}
          <View className="absolute top-0 h-1/2 w-full bg-white/20" />
        </Animated.View>
      </View>

      {/* Sparkle effect at the end of progress */}
      {showSparkle && progress > 0 && (
        <Animated.View className="absolute right-0 top-1/2 -translate-y-1/2" style={sparkleStyle}>
          <View className="h-4 w-4 rotate-45 rounded-sm bg-white/30" />
        </Animated.View>
      )}
    </View>
  );
};

export default ProgressBar;
