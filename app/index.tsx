import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/lib/supabase';
import useOnboardingStore from '@/store/onboardingStore';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function Index() {
  const { session, loading: authLoading } = useAuthStore();
  const { user, setUser } = useUserStore();
  const { hasSeenOnboarding } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserProfile() {
      if (session?.user && !user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              name: profile.name,
              avatar: profile.avatar_url,
              xp: profile.xp || 0,
              level: profile.level || 1,
              attributes: {
                faith: profile.faith || 1,
                boldness: profile.boldness || 1,
                wisdom: profile.wisdom || 1,
              },
              createdAt: profile.created_at,
              updatedAt: profile.updated_at,
            });
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
      setIsLoading(false);
    }

    loadUserProfile();
  }, [session, user, setUser]);

  if (authLoading || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="kid-text">Carregando...</Text>
      </View>
    );
  }

  // TODO: Remove this before releasing.
  return <Redirect href="/onboarding" />;

  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
