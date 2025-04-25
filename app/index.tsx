import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/lib/supabase';

export default async function Index() {
  const { session, loading } = useAuthStore();
  const { user, setUser } = useUserStore();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (session.user && !user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) {
      return <Redirect href="/login" />;
    }

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

  return <Redirect href="/(tabs)" />;
}
