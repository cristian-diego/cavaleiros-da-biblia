import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuizTimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function QuizTimer({ duration, onTimeUp, isActive }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress] = useState(new Animated.Value(1));

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      Animated.timing(progress, {
        toValue: timeLeft / duration,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else if (timeLeft === 0) {
      onTimeUp();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, isActive, duration, onTimeUp, progress]);

  const getTimerColor = () => {
    if (timeLeft > duration * 0.6) return '#4CAF50';
    if (timeLeft > duration * 0.3) return '#FFC107';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: getTimerColor(),
            },
          ]}
        />
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  timerContainer: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
  },
  timerText: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    textAlignVertical: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
});
