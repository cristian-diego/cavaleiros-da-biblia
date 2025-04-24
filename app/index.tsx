import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const { session, loading } = useAuthStore();
  
  if (loading) {
    return null;
  }
  
  if (!session) {
    return <Redirect href="/login" />;
  }
  
  return <Redirect href="/(tabs)" />;
}