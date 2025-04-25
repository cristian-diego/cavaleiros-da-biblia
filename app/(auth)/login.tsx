import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/userStore';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import KidButton from '@/components/ui/KidButton';

export default function LoginScreen() {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateError = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.username,
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
      }

      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView
        className="flex-1 pb-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center pb-10 pt-[60px]">
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1024/1024109.png',
            }}
            className="mb-4 h-[120px] w-[120px]"
          />
          <Text className="mb-2 text-kid-2xl font-bold text-kid-blue">Cavaleiros da Bíblia</Text>
          <Text className="text-kid-xl text-kid-purple">Vamos começar a aventura!</Text>
        </Animated.View>

        <View className="px-6">
          {error && (
            <Animated.View
              style={{
                transform: [{ translateX: slideAnim }],
              }}
              className="mb-4 rounded-kid bg-kid-red/10 p-3">
              <Text className="text-center text-kid-sm text-kid-red">{error}</Text>
            </Animated.View>
          )}

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-4">
            <TextInput
              className="rounded-kid-xl border-2 border-kid-blue bg-white px-11 py-4 text-kid-base text-gray-800"
              placeholder="Seu email mágico"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View className="absolute left-4 top-4">
              <Mail size={24} color="#4A90E2" />
            </View>
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="relative mb-6">
            <TextInput
              className="rounded-kid-xl border-2 border-kid-blue bg-white px-11 py-4 pr-12 text-kid-base text-gray-800"
              placeholder="Sua senha secreta"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <View className="absolute left-4 top-4">
              <Lock size={24} color="#4A90E2" />
            </View>
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={24} color="#4A90E2" />
              ) : (
                <Eye size={24} color="#4A90E2" />
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            className="mb-6"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}>
            <KidButton
              title="Entrar na Aventura!"
              onPress={handleLogin}
              loading={loading}
              variant="primary"
              size="lg"
              fullWidth
              theme="kid-bible"
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-row justify-center">
            <Text className="text-kid-base text-kid-purple">Novo por aqui? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text className="text-kid-base font-bold text-kid-blue">Junte-se a nós!</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
