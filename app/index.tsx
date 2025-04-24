import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import useUserStore from '@/store/userStore';

export default function Index() {
  const { session, loading } = useAuthStore();
  const { user } = useUserStore();

  if (loading) {
    return null;
  }

  if (!session || !user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
