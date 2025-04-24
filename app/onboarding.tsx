import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.slideContainer}>
        {slides.map((slide, index) => (
          <Animated.View
            key={slide.id}
            style={[styles.slide, { width }]}
            entering={SlideInRight}
            exiting={SlideOutLeft}>
            <Image source={{ uri: slide.image }} style={styles.slideImage} />
            <View style={styles.slideContent}>
              <slide.icon size={48} color={slide.color} />
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideDescription}>{slide.description}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.paginationDot, currentSlide === index && styles.paginationDotActive]}
            />
          ))}
        </View>

        <Button
          title={currentSlide === slides.length - 1 ? 'Criar Guardião' : 'Próximo'}
          onPress={handleNext}
          style={styles.nextButton}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EB',
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#CFB53B',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E85',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8F9779',
    textAlign: 'center',
    maxWidth: 300,
  },
  card: {
    width: '100%',
    padding: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E85',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#565B49',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0D7C2',
    fontSize: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  slideContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  slideImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 24,
    marginBottom: 32,
  },
  slideContent: {
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E85',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  slideDescription: {
    fontSize: 16,
    color: '#565B49',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0D7C2',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#2C3E85',
    width: 24,
  },
  nextButton: {
    alignSelf: 'stretch',
  },
});
