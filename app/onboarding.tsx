import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import useOnboardingStore from '@/store/onboardingStore';
import Button from '@/components/ui/Button';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  BounceIn,
  withSpring,
} from 'react-native-reanimated';
import { slides } from '@/data/onboardingSlides';
import KidButton from '@/components/ui/KidButton';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { setHasSeenOnboarding } = useOnboardingStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      scrollViewRef.current?.scrollTo({ x: width * (currentSlide + 1), animated: true });
    } else {
      setHasSeenOnboarding(true);
      router.replace('/login');
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        className="flex-1">
        {slides.map((slide, index) => (
          <Animated.View
            key={slide.id}
            className="flex-1 items-center justify-center px-8"
            style={{ width }}
            entering={SlideInRight.springify().damping(15).duration(500)}
            exiting={SlideOutLeft.duration(500)}>
            {/* <Animated.View
              className="animate-float w-[85%] items-center justify-center overflow-hidden"
              entering={BounceIn.delay(300)}>
              <Image
                source={{ uri: slide.image }}
                className="h-[250] w-full rounded-kid-lg"
                style={{ width: width * 0.75, height: width * 0.75 }}
                resizeMode="cover"
              />
            </Animated.View> */}

            <Animated.View
              className="kid-card mt-8 items-center"
              entering={BounceIn.delay(300).duration(500)}>
              <View className="mb-4 rounded-full bg-kid-blue/10 p-4">
                <slide.icon size={48} color={slide.color} />
              </View>
              <Text className="kid-title text-center">{slide.title}</Text>
              <Text className="kid-text px-4 text-center">{slide.description}</Text>
            </Animated.View>
          </Animated.View>
        ))}
      </ScrollView>

      <Animated.View
        className="bg-white/80 p-6 backdrop-blur-sm"
        entering={FadeIn.duration(500)}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View className="mb-6 flex-row justify-center space-x-2">
          {slides.map((_, index) => (
            <Animated.View
              key={index}
              className={`h-2 rounded-full ${
                currentSlide === index ? 'w-8 bg-kid-blue' : 'w-2 bg-kid-blue/20'
              }`}
              entering={BounceIn.delay(index * 100).duration(500)}
            />
          ))}
        </View>

        <KidButton
          title={currentSlide === slides.length - 1 ? 'Começar Aventura!' : 'Próximo'}
          onPress={handleNext}
          fullWidth
          style={{ marginVertical: 10 }}
          textStyle={{ textTransform: 'uppercase' }}
        />
      </Animated.View>
    </View>
  );
}
