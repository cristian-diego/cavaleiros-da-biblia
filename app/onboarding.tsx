import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { avatars } from '@/data/avatars';
import { Avatar } from '@/types';
import useUserStore from '@/store/userStore';
import useOnboardingStore from '@/store/onboardingStore';
import AvatarSelect from '@/components/ui/AvatarSelect';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { slides } from '@/data/onboardingSlides';

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
    <View className="flex-1 bg-[#F5F1EB]">
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
            entering={SlideInRight}
            exiting={SlideOutLeft}>
            <Image
              source={{ uri: slide.image }}
              className="mb-8 h-[80%] w-[80%] rounded-3xl"
              style={{ width: width * 0.8, height: width * 0.8 }}
            />
            <View className="items-center">
              <slide.icon size={48} color={slide.color} />
              <Text className="mb-3 mt-4 text-center text-2xl font-bold text-[#2C3E85]">
                {slide.title}
              </Text>
              <Text className="text-center text-base leading-6 text-[#565B49]">
                {slide.description}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <View className="p-6">
        <View className="mb-6 flex-row justify-center">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${
                currentSlide === index ? 'w-6 bg-[#2C3E85]' : 'bg-[#E0D7C2]'
              }`}
            />
          ))}
        </View>

        <Button
          title={currentSlide === slides.length - 1 ? 'Criar Guardião' : 'Próximo'}
          onPress={handleNext}
          className="w-full"
          variant="primary"
        />
      </View>
    </View>
  );
}
