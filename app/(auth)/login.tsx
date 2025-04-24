import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/userStore';
import Button from '@/components/ui/Button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      className="flex-1 bg-[#F5F1EB]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView
        className="flex-1 pb-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="items-center pb-10 pt-[60px]">
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/4240498/pexels-photo-4240498.jpeg?auto=compress&cs=tinysrgb&w=300',
            }}
            className="mb-4 h-[100px] w-[100px] rounded-full"
          />
          <Text className="mb-2 text-2xl font-bold text-[#2C3E85]">Guardiões da Verdade</Text>
          <Text className="text-lg text-[#8F9779]">Bem-vindo de volta!</Text>
        </View>

        <View className="px-6">
          {error && <Text className="mb-4 text-center text-sm text-red-600">{error}</Text>}

          <View className="mb-4 flex-1 ">
            <TextInput
              className="rounded-xl border border-[#E0D7C2] bg-white px-11 py-3 text-base text-gray-800"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View className="absolute left-3 top-3">
              <Mail size={20} color="#8B877D" />
            </View>
          </View>

          <View className="relative mb-4">
            <TextInput
              className="rounded-xl border border-[#E0D7C2] bg-white px-11 py-3 pr-12 text-base text-gray-800"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <View className="absolute left-3 top-3">
              <Lock size={20} color="#8B877D" className="absolute left-3 top-3" />
            </View>

            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#8B877D" />
              ) : (
                <Eye size={20} color="#8B877D" />
              )}
            </TouchableOpacity>
          </View>

          <View className="mb-6 flex-row items-center justify-between">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}>
              <View
                className={`mr-2 h-5 w-5 rounded border-2 ${
                  rememberMe ? 'border-[#2C3E85] bg-[#2C3E85]' : 'border-[#8B877D]'
                }`}
              />
              <Text className="text-[#8B877D]">Lembrar-me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-[#2C3E85]">Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            className="mb-6"
            fullWidth
          />

          <View className="mb-6 flex-row items-center">
            <View className="h-px flex-1 bg-[#E0D7C2]" />
            <Text className="mx-4 text-[#8B877D]">ou continue com</Text>
            <View className="h-px flex-1 bg-[#E0D7C2]" />
          </View>

          <View className="mb-6 flex-row justify-center space-x-4">
            <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-white">
              <Image
                source={{
                  uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                }}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-white">
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
                }}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-[#8B877D]">Não tem uma conta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text className="font-semibold text-[#2C3E85]">Registre-se</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
