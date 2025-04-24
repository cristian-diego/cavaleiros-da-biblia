import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import useOnboardingStore from '@/store/onboardingStore';

export default function AuthLayout() {
  const router = useRouter();
  const { hasSeenOnboarding } = useOnboardingStore();

  useEffect(() => {
    if (!hasSeenOnboarding) {
      router.replace('/onboarding');
    }
  }, [hasSeenOnboarding]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
